const students = [
  {
    name: "David Vincent Gurning",
    nickName: "David",
    class: "FSW-1",
    address: {
      province: "North Sumatera",
      city: "Medan",
    },
    education: {
      bachelor: "Universitas Teknologi Del",
    },
  },
  {
    name: "Yudriqul Aulia",
    nickName: "Yudi",
    class: "FSW-1",
    address: {
      province: "Jambi",
      city: "Jambi",
    },
    education: {
      bachelor: "Universitas Jambi",
    },
  },
  {
    name: "Iko Indra Gunawan",
    nickName: "Iko",
    class: "FSW-1",
    address: {
      province: "East Java",
      city: "Surabaya",
    },
    education: {
      bachelor: "UPN Veteran Jatim",
    },
  },
  {
    name: "Arwendo Erza Sadewa",
    nickName: "Erza",
    class: "FSW-1",
    address: {
      province: "Lampung",
      city: "Lampung",
    },
    education: {
      bachelor: "UPN Veteran Jatim",
    },
  },
  {
    name: "Dhiya Ul Faruq",
    nickName: "Faruq",
    class: "FSW-1",
    address: {
      province: "East Java",
      city: "Jember",
    },
    education: {
      bachelor: "Universitas Jember",
    },
  },
  {
    name: "Fariq Abdhe Manaf",
    nickName: "Far1q",
    class: "FSW-1",
    address: {
      province: "East Java",
      city: "Jember",
    },
    education: {
      bachelor: "Universitas Jember",
    },
  },
];

/*for (let index = 0; index < Math.min(students.length, 3); index++) {
  const student = students[index];
  const describeStudent = `My name is ${student.name}, used to called ${student.nickName}. I am from ${student.address.city}, ${student.address.province}. And I am student of ${student.education.bachelor}.`;
  console.log(describeStudent);
}

students.slice(0, 3).map((student) => {
  const describeStudent = `My name is ${student.name}, used to called ${student.nickName}. I am from ${student.address.city}, ${student.address.province}. And I am student of ${student.education.bachelor}.`;
  console.log(describeStudent);
});*/

/*students.map((student) => {
  if (student.address.province == "East Java") {
    const describeStudent = `My name is ${student.name}, used to called ${student.nickName}. I am from ${student.address.city}, ${student.address.province}. And I am student of ${student.education.bachelor}.`;
    console.log(describeStudent);
  }
});*/

/*filteredStudents = students.filter((student) => {
  return student.address.province == "East Java";
});

filteredStudents.map((student) => {
  const describeStudent = `My name is ${student.name}, used to called ${student.nickName}. I am from ${student.address.city}, ${student.address.province}. And I am student of ${student.education.bachelor}.`;
  console.log(describeStudent);
});*/

students
  .sort((a, b) => {
    return a.name.localeCompare(b.name);
  })
  .map((student) => {
    const describeStudent = `My name is ${student.name}, used to called ${student.nickName}. I am from ${student.address.city}, ${student.address.province}. And I am student of ${student.education.bachelor}.`;
    console.log(describeStudent);
  });
