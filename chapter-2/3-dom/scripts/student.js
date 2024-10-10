const studentContent = document.getElementById("student-content");
const search = document.getElementById("search");
const searchForm = document.getElementById("search-form");

search.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  searchStudentContent(searchValue);
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

async function searchStudentContent(search) {
  studentContent.innerHTML = "<h1>Loading... </h1>";

  const data = await getStudentData(search);
  if (data.length === 0) {
    studentContent.innerHTML = `<h1>Searching ${search} not found</h1>`;
    return;
  }

  let studentContentHTML = "";
  data.map((student) => {
    const studentContent = `
        <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${student.name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">
                            ${student.education.bachelor}
                        </h6>
                        <p class="card-text">
                            My name is ${student.name}, used to be called ${student.nickName}. I am from ${student.address.city}, ${student.address.province}. And I am a student of ${student.education.bachelor}.
                        </p>
                    </div>
                </div>
            </div>`;
    studentContentHTML += studentContent;
  });

  studentContent.innerHTML = studentContentHTML;
}

const getStudentData = async (search) => {
  const response = await fetch("./data/student.json");
  const data = await response.json();

  const filtereddata = data.filter((student) => {
    return (
      student.name.toLowerCase().includes(search) ||
      student.education.bachelor.toLowerCase().includes(search)
    );
  });

  return filtereddata;
};

searchStudentContent("");
