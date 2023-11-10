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
    await connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 5 } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;
      default:
        break;
    }

    const totalTags = await Tag.countDocuments(query);

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const totalPages = Math.ceil(totalTags / pageSize);

    return { tags, totalPages };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        skip: (page - 1) * pageSize,
        limit: pageSize + 1,
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    const totalTags = tag.questions.length;

    if (!tag) throw new Error("Tag not found");

    const tagQuestions = tag.questions;

    const totalPages = Math.ceil(totalTags / pageSize);

    return { tagTitle: tag.name, questions: tagQuestions, totalPages };
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
