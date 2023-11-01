"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase(); // connect to database

    const { userId } = params; // get userId from params

    const user = await User.findById(userId); // find user by userId

    if (!user) throw new Error("User not found"); // throw error if user not found

    // find interactions for the user and group by tags...
    // Interactions...

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase(); // connect to database

    const { filter /* page, pageSize, searchQuery */ } = params;

    const tagFilter: FilterQuery<ITag> = filter
      ? { name: filter.toUpperCase() }
      : {}; // set tagFilter to filter if filter is not empty

    const tags = await Tag.find(tagFilter); // find all tags

    return { tags }; // return tags
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase(); // connect to database

    const { tagId, /* page = 1, pageSize = 10, */ searchQuery } = params; // get tagId, page, pageSize and searchQuery from params

    const tagFilter: FilterQuery<ITag> = { _id: tagId }; // set tagFilter to tagId

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions", // populate questions
      model: Question, // model is Question
      match: searchQuery // match searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } } // if searchQuery is not empty, match title with searchQuery
        : {},
      options: {
        sort: { createdAt: -1 }, // sort by createdAt
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" }, // populate tags
        { path: "author", model: User, select: "_id clerkId name picture" }, // populate author
      ],
    });

    if (!tag) throw new Error("Tag not found"); // throw error if tag not found

    const tagQuestions = tag.questions; // get tag questions

    return { tagTitle: tag.name, questions: tagQuestions }; // return tag title and questions
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHotTags() {
  try {
    await connectToDatabase(); // connect to database

    const tags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          description: 1,
          questions: { $size: "$questions" },
          followers: { $size: "$followers" },
        },
      },
      {
        $sort: {
          questions: -1,
          followers: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
