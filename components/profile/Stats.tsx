import Image from "next/image";
import React from "react";

interface Props {
  questionsResults: any;
  answersResults: any;
}

export default function Stats({ questionsResults, answersResults }: Props) {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">Stats</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {questionsResults}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {answersResults}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <Image
            src={"/assets/icons/gold-medal.svg"}
            alt="gold-medal"
            width={40}
            height={40}
          />

          <div>
            <p className="paragraph-semibold text-dark200_light900">0</p>
            <p className="body-medium text-dark400_light700">Gold badges</p>
          </div>
        </div>
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <Image
            src={"/assets/icons/silver-medal.svg"}
            alt="silver-medal"
            width={40}
            height={40}
          />

          <div>
            <p className="paragraph-semibold text-dark200_light900">0</p>
            <p className="body-medium text-dark400_light700">Gold badges</p>
          </div>
        </div>
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <Image
            src={"/assets/icons/bronze-medal.svg"}
            alt="bronze-medal"
            width={40}
            height={40}
          />

          <div>
            <p className="paragraph-semibold text-dark200_light900">0</p>
            <p className="body-medium text-dark400_light700">Gold badges</p>
          </div>
        </div>
      </div>
    </div>
  );
}
