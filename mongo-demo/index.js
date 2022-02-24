const mongoose = require("mongoose");
const hello = require("object");
hello.id = "xyz";

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => console.log("Connection successful"))
  .catch((err) => console.log("Error" + err));

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxlength: 255,
    // match: /pattern/,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      // custom validator, use isAsync: true & pass a callback as argument to convert to async
      validator: function (v) {
        const result = v && v.length > 0;
        return result;
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    // get the value while retrieving from database
    get: (v) => Math.round(v),
    // set the value while saving to database
    set: (v) => Math.round(v),
  },
});

// Comparison Query Operators
// eq (equal)
// ne (not equal to)
// gt (greater than)
// gte (greater than or equal to)
// lt
// lte
// in
// nin (not in)

// Logical Query Operators
// or
// and

// compile schema into a model to get a class
const Course = mongoose.model("course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "-",
    author: "Mosh",
    tags: null,
    isPublished: true,
    price: 15,
  });

  try {
    // await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}

// createCourse();

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    // .find({ author: "Mosh", isPublished: true })
    // .find({ price: { $in: [10, 15, 20] } })
    // Starts with Mosh
    // .find({ author: /^Mosh/ })

    // Ends with Mosh, case-insensitive
    // .find({ author: /Hamedani$/i })

    // Contains Mosh
    .find({ author: /.*Mosh.*/ })

    // .and([{ author: "Mos" }, { isPublished: true }])
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    // .select({ name: 1, tags: 1 })
    .count();

  console.log(courses);
}

// getCourses();

async function updateCourse(id) {
  // Approach: Query first
  // findById()
  // Modify its properties
  // save()

  // const course = await Course.findById(id);
  // if (!course) {
  //   console.log("Update failed...");
  //   return;
  // }
  // course.set({ isPublished: true, author: "Another author" });

  // const result = await course.save();
  // console.log(result);

  // Approach: Update first
  // Update directly
  // Optional: Get the updated document

  // updateOne and updateMany requires {_id: id} - returns result
  // findByIdAndUpdate - returns the course object
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jason",
        isPublished: false,
      },
    },
    // Returns the updated document
    { new: true }
  );
  console.log(course);
}

// updateCourse("61ca3181cb6db76e53182079");

async function removeCourse(id) {
  // deleteOne and deleteMany- returns result
  // const result = await Course.deleteOne({ _id: id });

  // findByIdAndRemove - returns the object if present, else null
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

// removeCourse("61ca3181cb6db76e53182079");
