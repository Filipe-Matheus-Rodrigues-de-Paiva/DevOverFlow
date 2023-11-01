"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase();

    const { author, content, question, path } = params;

    const answer = await Answer.create({
      author,
      content,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    // TODO: add interaction...

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllAnswers(params: GetAnswersParams) {
  try {
    await connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase(); // connection to database

    const { answerId, hasdownVoted, hasupVoted, path, userId } = params; // destructuring params

    let updateQuery = {}; // update query

    if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId }, // remove the upvote if the user has already upvoted
      };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId }, // remove the downvote if the user has already downvoted
        $push: { upvotes: userId }, // and add the upvote
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }; // add the upvote if the user has not voted
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    }); // update the answer

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase(); // connection to database

    const { answerId, hasdownVoted, hasupVoted, path, userId } = params; // destructuring params

    let updateQuery = {}; // update query

    if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId }, // remove the downvote if the user has already downvoted
      };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId }, // remove the upvote if the user has already upvoted
        $push: { downvotes: userId }, // and add the downvote
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }; // add the downvote if the user has not voted
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    }); // update the answer

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    await connectToDatabase(); // connection to database

    const { answerId, path } = params; // destructuring params

    const answer = await Answer.findById(answerId); // find the answer

    if (!answer) {
      throw new Error("Answer not found");
    }

    await answer.deleteOne({ _id: answerId }); // delete the answer
    await Question.updateMany({
      _id: answer.question,
      $pull: { answers: answerId },
    }); // remove the answer from the question
    await Interaction.deleteMany({ answer: answerId }); // delete interactions related to answer

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
