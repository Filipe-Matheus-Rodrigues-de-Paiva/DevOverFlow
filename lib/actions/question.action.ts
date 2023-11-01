"use server";

import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
  /* ViewQuestionParams */
} from "./shared.types";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    /* const { filter, page = 1, pageSize = 10, searchQuery } = params; */

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase(); // connect to database
    const { title, content, tags, author, path } = params; // get title, content, tags, author and path from params

    const newQuestion = await Question.create({
      title,
      content,
      author,
    }); // create new question

    const tagDocuments = []; // array of tag documents

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: newQuestion._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag);
    } // for each tag, find or create tag and push to tagDocuments

    await Question.findByIdAndUpdate(newQuestion._id, {
      $push: { tags: { $each: tagDocuments } },
    }); // push tagDocuments to question

    revalidatePath(path); // revalidate path
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({
        path: "author",
        model: User,
      })
      .populate({ path: "tags", model: Tag });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { hasdownVoted, hasupVoted, path, questionId, userId } = params;

    let updateQuery = {}; // update query for the question

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } }; // remove the upvote
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      }; // remove the downvote and add the upvote
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }; // add the upvote
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    }); // new: true returns the updated document

    if (!question) {
      throw new Error("Question not found");
    }

    // increment user's reputation: TODO

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { hasdownVoted, hasupVoted, path, questionId, userId } = params;

    let updateQuery = {}; // update query for the question

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } }; // remove the downvote
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      }; // remove the upvote and add the downvote
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }; // add the downvote
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    }); // new: true returns the updated document

    if (!question) {
      throw new Error("Question not found");
    }

    // decrement user's reputation: TODO

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await connectToDatabase();

    const { path, questionId } = params;

    await Question.findByIdAndDelete(questionId); // delete question
    await Answer.deleteMany({ question: questionId }); // delete answers related to question
    await Interaction.deleteMany({ question: questionId }); // delete interactions related to question
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    ); // remove question from tags

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    await connectToDatabase();

    const { content, path, questionId, title } = params;

    const question = await Question.findById(questionId); // find question

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title; // update title
    question.content = content; // update content

    await question.save(); // save question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHotQuestions() {
  try {
    await connectToDatabase();

    const questions = await Question.aggregate([
      {
        $project: {
          title: 1,
          content: 1,
          tags: 1,
          views: 1,
          author: 1,
          answers: { $size: "$answers" },
          createdAt: 1,
          upvotesCount: { $size: "$upvotes" }, // Count the number of upvotes
          downvotesCount: { $size: "$downvotes" }, // Count the number of downvotes
        },
      },
      {
        $sort: {
          upvotesCount: -1,
          downvotesCount: 1,
          views: -1,
          answers: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
