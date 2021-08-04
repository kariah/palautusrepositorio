  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string; 
  }

  interface CourseExtentedPartBase extends CoursePartBase { 
    description: string;
  }

  interface CourseNormalPart extends CourseExtentedPartBase {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject"; 
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CourseExtentedPartBase {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

  export default CoursePart