"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";

export async function getUserById(params: GetUserByIdParams) {
  try {
    await connectToDatabase(); // connect to database

    const { userId } = params; // get userId from params

    const user = await User.findOne({ clerkId: userId }); // find user by clerkId

    return user; // return user
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase(); // connect to database

    const newUser = await User.create(userData); // create new user

    return newUser; // return new user
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    await connectToDatabase(); // connect to database

    const { clerkId, updateData, path } = userData; // get clerkId, updateData and path from userData

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true }); // update user

    revalidatePath(path); // revalidate path
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase(); // connect to database

    const { clerkId } = params; // get clerkId from params

    const user = await User.findOneAndDelete({ clerkId }); // find and delete user

    if (!user) throw new Error("User not found"); // if user not found, throw error

    await Question.deleteMany({ author: user._id }); // delete all questions made by the user

    await Answer.deleteMany({ author: user._id }); // delete all answers made by the user

    const deletedUser = await User.findByIdAndDelete(user._id); // delete user

    return deletedUser; // return deleted user
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    await connectToDatabase();

    const users = await User.find({}).sort({ createdAt: -1 });

    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase(); // connect to database

    const { questionId, path, userId } = params; // get questionId, path and userId from params

    const user = await User.findById(userId); // find user by userId

    if (!user) throw new Error("User not found"); // if user not found, throw error

    const isQuestionSaved = user.saved.includes(questionId); // check if question is already saved

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId }, // if question is already saved, pull it from saved array
        },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId }, // if question is not saved, add it to saved array
        },
        { new: true }
      );
    }

    revalidatePath(path); // revalidate path
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase(); // connect to database

    const { clerkId, filter, page = 1, pageSize = 10, searchQuery } = params; // get clerkId, filter, page, pageSize and searchQuery from params

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {}; // if searchQuery is present, set query to searchQuery, else set it to empty object

    const user = await User.findOne({ clerkId }).populate({
      path: "saved", // find user by clerkId and populate 'saved' array
      match: query, // match query
      options: {
        sort: { createdAt: -1 }, // sort by createdAt
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" }, // populate tags
        { path: "author", model: User, select: "_id clerkId name picture" }, // populate author
      ],
    });

    if (!user) throw new Error("User not found"); // if user not found, throw error

    const savedQuestions = user.saved; // get saved questions

    return { questions: savedQuestions }; // return saved questions
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    await connectToDatabase(); // connect to database

    const { userId, page = 1, pageSize = 10 } = params;

    const totalQuestions = await Question.countDocuments({ author: userId }); // count total questions

    const questions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");

    return { questions, totalQuestions }; // return questions and total questions
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    await connectToDatabase(); // connect to database

    const { userId, page = 1, pageSize = 10 } = params;

    const totalAnswers = await Answer.countDocuments({ author: userId }); // count total answers

    const answers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    return { answers, totalAnswers }; // return answers and total answers
  } catch (error) {
    console.log(error);
    throw error;
  }
}
