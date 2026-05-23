import { Request, Response } from "express";
import prisma from "../config/prisma";

export const seedColleges = async (
  req: Request,
  res: Response
) => {
  try {
    await prisma.college.createMany({
      data: [
        {
          name: "IIT Hyderabad",
          location: "Hyderabad",
          fees: 250000,
          rating: 4.8,
          placement: 95,
          description: "Top engineering institute"
        },
        {
          name: "VIT Vellore",
          location: "Vellore",
          fees: 190000,
          rating: 4.4,
          placement: 89,
          description: "Popular private university"
        },
        {
          name: "NIT Warangal",
          location: "Warangal",
          fees: 180000,
          rating: 4.6,
          placement: 91,
          description: "National Institute of Technology"
        }
      ]
    });

    res.json({
      message: "Colleges seeded successfully"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Something went wrong"
    });
  }
};

export const getColleges = async (
  req: Request,
  res: Response
) => {
  try {
    const { search, location, maxFees } =
      req.query;

    const colleges =
      await prisma.college.findMany({
        where: {
          name: {
            contains:
              typeof search === "string"
                ? search
                : undefined
          },

          location:
            typeof location === "string"
              ? {
                  contains: location
                }
              : undefined,

          fees:
            typeof maxFees === "string"
              ? {
                  lte: Number(maxFees)
                }
              : undefined
        }
      });

    res.json(colleges);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch colleges"
    });
  }
};

export const compareColleges = async (
  req: Request,
  res: Response
) => {
  try {
    const ids: string[] = req.body.ids;

    const colleges =
      await prisma.college.findMany({
        where: {
          id: {
            in: ids
          }
        }
      });

    res.json(colleges);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to compare colleges"
    });
  }
};

export const getSingleCollege = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const college =
      await prisma.college.findUnique({
        where: {
          id: id
        }
      });

    if (!college) {
      return res.status(404).json({
        error: "College not found"
      });
    }

    res.json(college);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch college"
    });
  }
};