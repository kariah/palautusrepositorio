  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string; 
  }

  interface CourseExtentedPartBase extends CoursePartBase { 
    description: string;
  } 

  interface CourseSpecialPartBase extends CourseExtentedPartBase { 
    requirements: Array<string>;
  } 

  interface CourseNormalPart extends CourseExtentedPartBase {
    type: "normal";
  } 

  interface CourseSpecialPart extends CourseSpecialPartBase {
    type: "special";
  }
    interface CourseProjectPart extends CoursePartBase {
    type: "groupProject"; 
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CourseExtentedPartBase {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  type CoursePart = CourseNormalPart | CourseSpecialPart | CourseProjectPart | CourseSubmissionPart;

  export default CoursePart