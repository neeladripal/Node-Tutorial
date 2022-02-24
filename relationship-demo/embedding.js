const mongoose = require("mongoose");

const db =
  process.env.MONGO_URI;
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

const authorSchema = mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  website: String,
});

const Author = mongoose.model("author", authorSchema);

const Course = mongoose.model(
  "course",
  mongoose.Schema({
    name: String,
    author: {
      type: authorSchema,
      required: true,
    },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId);
  // course.author.name = "Mosh Hamedani";
  // course.save();
  // course.author.save() does not exist

  // Update directly
  const course = await Course.findByIdAndUpdate(
    courseId,
    {
      $unset: {
        author: "",
      },
    },
    { new: true }
  );
  console.log(course);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// createCourse("Node Course", new Author({ name: "Mosh" }));
updateAuthor("61ec6d9726f46f5ea92d863c");
