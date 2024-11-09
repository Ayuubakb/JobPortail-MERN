
db=db.getSiblingDB("jobPortail")

db.User.insertMany([
  {
    _id: ObjectId("6666035af4836fa89185d8ea"),
    login: "joe@gmail.com",
    password: "$2b$10$nXkv2YPx6rkstB1No5D.Qu.GyO9/3TaZd2xSjz.ImLKHPR6fS86py",
    companyName: "IBM",
    location: "Casablanca",
    picture: "ibm.png",
    field: "Technology",
    numEmployees: 500,
    emailReceive: true,
    offers: [
      {
        id: ObjectId("66686b886196ea05464e288e"),
        title: "Software Engineer",
        postDate: new Date("2024-06-05T00:00:00.000Z"),
        expireDate: new Date("2024-07-05T00:00:00.000Z"),
        field: "Technology",
        description: "Join our team as a Software Engineer to work on cutting-edge technology.",
        position: "Permanent",
        time: "Full-Time",
        presence: "Remote",
        numDemands: 5,
        archived: false
      },
      {
        id: ObjectId("66686b886196ea05464e2891"),
        title: "Data Scientist",
        postDate: new Date("2024-06-20T00:00:00.000Z"),
        expireDate: new Date("2024-07-20T00:00:00.000Z"),
        field: "Technology",
        description: "Seeking a Data Scientist to analyze complex datasets and provide actionable insights.",
        position: "Permanent",
        time: "Full-Time",
        presence: "Hybrid",
        numDemands: 4,
        archived: true
      },
      {
        id: ObjectId("66758b28e2ca0bb5db8554eb"),
        title: "Big Data and AI engineer",
        postDate: new Date("2024-06-20T18:11:31.607Z"),
        expireDate: new Date("2024-06-29T00:00:00.000Z"),
        field: "Technology",
        description: "We are looking for an experienced big data and AI engineer. Requirements: -Engineering degree -Flask - +4 years of experience. Salary: 12000 DH",
        position: "Permanent",
        time: "Part-Time",
        presence: "Hybrid",
        numDemands: 0,
        archived: false,
        _id: ObjectId("66758b28e2ca0bb5db8554ec")
      },
      {
        id: ObjectId("66758b59e2ca0bb5db8554f0"),
        title: "Doctor",
        postDate: new Date("2024-06-20T18:11:31.607Z"),
        expireDate: new Date("2024-07-03T00:00:00.000Z"),
        field: "Healthcare",
        description: "uh",
        position: "Temporary",
        time: "Part-Time",
        presence: "OnSite",
        numDemands: 0,
        archived: false,
        _id: ObjectId("66758b59e2ca0bb5db8554f1")
      }
    ],
    __v: 0
  },
  {
    _id: ObjectId("666719f1ede51920cbc09862"),
    login: "akoubri@gmail.com",
    password: "$2b$10$p0EwPqSufq.RcsGIavC5He4SUYrQ/LjkbcxzSv0nEi3f7wrmMbb1O",
    firstName: "ayoub",
    lastName: "akoubri",
    field: "Technology",
    number: "0700781400",
    emailReceive: true,
    demands: [
      {
        IdOffer: ObjectId("66686b886196ea05464e288e"),
        date: new Date("2024-06-16T21:56:22.399Z"),
        status: 1,
        interviewDate: new Date("2024-06-20T00:00:00.000Z"),
        _id: ObjectId("666f5fe864d1a71b887fef28")
      },
      {
        IdOffer: ObjectId("66686b886196ea05464e2891"),
        date: new Date("2024-06-16T21:56:22.399Z"),
        status: 0,
        interviewDate: new Date("2024-06-16T21:56:22.399Z"),
        _id: ObjectId("666f5fed64d1a71b887fef2f")
      },
      {
        IdOffer: ObjectId("60b21f4c8b13a40c9ef1f1a7"),
        date: new Date("2024-06-16T21:56:22.399Z"),
        status: 2,
        interviewDate: new Date("2024-06-16T21:56:22.399Z"),
        _id: ObjectId("666f5ff164d1a71b887fef36")
      },
      {
        IdOffer: ObjectId("667447bc42a784ffb7e46067"),
        date: new Date("2024-06-20T18:11:31.594Z"),
        status: 2,
        interviewDate: new Date("2024-06-20T18:11:31.594Z"),
        _id: ObjectId("66747b68e2ca0bb5db855322")
      }
    ],
    __v: 0,
    picture: "IMG_20230319_205435_523-Photoroom.png-Photoroom.png",
    cv: "Akoubri.jpg"
  },
  {
    _id: ObjectId("66671b3c7dbffc2ec652edd1"),
    login: "oracle@gmail.com",
    password: "$2b$10$REJ5iaGpA.YLiKuREydqY.OcvzRKzUhNzQa8ukrT0jDh.6Ts66o7K",
    companyName: "Oracle",
    location: "Casablanca",
    picture: "ora.png",
    field: "Technology",
    numEmployees: 500,
    emailReceive: true,
    offers: [
      {
        id: ObjectId("60b21f4c8b13a40c9ef1f1a7"),
        title: "Product Manager",
        postDate: new Date("2024-07-05T00:00:00.000Z"),
        expireDate: new Date("2024-09-05T00:00:00.000Z"),
        field: "Consumer Goods",
        description: "Join our team as a Product Manager to lead the development and launch of new products.",
        position: "Permanent",
        time: "Full-Time",
        presence: "Hybrid",
        numDemands: 7,
        archived: false
      }
    ],
    __v: 0
  },
  {
    _id: ObjectId("66671bdb9aaadc4f48ca3cc6"),
    login: "zakaria@gmail.com",
    password: "$2b$10$UGKnLvgml6MrEd6ak6PIDO6/ajt7iY.0cP0PPrS9nzFuZjPQQEuke",
    firstName: "Zakaria",
    lastName: "Akb",
    field: "Automotive",
    number: "0662202873",
    emailReceive: true,
    demands: [],
    __v: 0,
    picture: "defaultUser.jpg",
    cv: "cv-bureau.jpg"
  },
  {
    _id: ObjectId("66671d4a9aaadc4f48ca3ccb"),
    login: "lahcen@gmail.com",
    password: "$2b$10$qV8M1qRx1WAj7ziQOTtd7e8/zGH2P1OK93UzMOdpqEv33fWItmpM2",
    firstName: "Lahcen",
    lastName: "Immejane",
    field: "Automotive",
    number: "07252563",
    emailReceive: true,
    demands: [],
    __v: 0,
    picture: "defaultUser.jpg",
    cv: "cv-bureau.jpg"
  },
  {
    _id: ObjectId("6668a5706a3345b3b0e13aa3"),
    login: "finance@gmail.com",
    password: "$2b$10$x6uKI74diRP2kNZ3UVMTB.bBaaJ7yD931avuodflVkT0O2ZabF1xS",
    companyName: "CIH",
    location: "Rabat",
    picture: "CIH.png",
    field: "Finance",
    numEmployees: 250,
    emailReceive: true,
    offers: [
      {
        id: ObjectId("667447bc42a784ffb7e46067"),
        title: "Accountant",
        postDate: new Date("2024-06-05T00:00:00.000Z"),
        expireDate: new Date("2024-06-12T00:00:00.000Z"),
        field: "Finance",
        description: "uh",
        position: "Permanent",
        time: "Full-Time",
        presence: "Hybrid",
        numDemands: 5,
        archived: true
      }
    ],
    __v: 0
  }
]);

print(`${db.User.countDocuments()} records added to User document`)