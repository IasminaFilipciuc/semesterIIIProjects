const link = "http://petlatkea.dk/2019/hogwartsdata/students.json";
const sortingSection = document.querySelector("#sortingSection");
const houseFilter = sortingSection.querySelector("#houseFilter");
const nameList = document.querySelector("#nameList");
const studentList = [];
let i = 0;
let lengthOfStudent = studentList.length;

fetch(link).then(e=>e.json()).then(data => data.forEach((data) => {
    main(makeStringNice(data.fullname), makeStringNice(data.house), "initial", data.gender)
}));
houseFilter.addEventListener("change", () =>{reinitialize()});
sortingSection.querySelector("#firstNameSort").addEventListener("click", () =>{sortStudents("firstName")});
sortingSection.querySelector("#lastNameSort").addEventListener("click", () =>{sortStudents("lastName")});
sortingSection.querySelector("#houseNameSort").addEventListener("click", () =>{sortStudents("houseName")});

function main(fullname, house, initial, gender) {
    let student = document.createElement("article");
    let name = document.createElement("p");
    let houseOfStudent = document.createElement("p");
    name.classList.add("name");
    houseOfStudent.classList.add("house");
    name.innerText = "Name: " + fullname;
    houseOfStudent.innerText = "House: " + house;
    student.appendChild(name);
    student.appendChild(houseOfStudent);
    if(initial === "initial") {
        createStudent(student, gender);
    }
    if(houseFilter.value === "all") {
        nameList.appendChild(student);
    } else {
        if(house === houseFilter.value) {
            nameList.appendChild(student);
        }
    }
}


function Student(First, Last, House, Gender, Nickname) {
    this.firstName = First;
    this.lastName = Last;
    this.houseS = House;
    this.gender = Gender;
    this.nickname = Nickname;
    this.getGender = function () {return this.gender};
    this.getFirstName = function() {
        if(this.nickname !== undefined){
            return this.firstName + " " + this.nickname;
        } else {
            return this.firstName
        }
    };
    this.getLastName = function() {
        if(this.lastName !== undefined) {
            return this.lastName
        } else {
            return ""
        }
    };
    this.getHouse = function() {return this.houseS};
}
function createStudent(student, gender) {
    let firstName = student.querySelector(".name").innerHTML.split(" ")[1];
    let nickname;
    let lastName;
    if(student.querySelector(".name").innerHTML.includes('"')) {
        let index = student.querySelector(".name").innerHTML.indexOf('"');
        nickname = student.querySelector(".name").innerHTML.substring(index, student.querySelector(".name").innerHTML.lastIndexOf('"') + 1 );
        lastName = student.querySelector(".name").innerHTML.split(" ")[3];
    } else {
        lastName = student.querySelector(".name").innerHTML.split(" ")[2];
    }
    let house = student.querySelector(".house").innerHTML.split(" ")[1];
    let newStudent = new Student(firstName, lastName, house, gender, nickname);
    console.log(firstName + "\n", lastName + "\n", nickname);
    studentList.push(newStudent);
}

function reinitialize() {
    reinitializeHelper();
    for (;i < lengthOfStudent; i++) {
        main(studentList[i].getFirstName() + " " +  studentList[i].getLastName(), studentList[i].getHouse())
    }
}
function reinitializeHelper() {
    nameList.innerHTML = "";
    i = 0;
    lengthOfStudent = studentList.length;
}
function sortStudents(byWhat) {
    switch (byWhat) {
        case "firstName":
            i2 = 0;
            studentList.sort((a, b) => (a.getFirstName() > b.getFirstName()) ? 1 : -1);
            break;
        case "lastName":
            i2 = 0;
            studentList.sort((a, b) => (a.getLastName() > b.getLastName()) ? 1 : -1);
            break;
        case "houseName":
            if(i2 !== 1 && houseFilter.value === "all") {
                studentList.sort((a, b) => (a.getHouse() > b.getHouse()) ? 1 : -1);
            }
            i2 = 1;
            break;
    }
    reinitialize();
}
function makeStringNice(string) {
    if(string === undefined) {
        return "";
    } else {
        let splitStr = string.toString().toLowerCase().trim().split(' ');
        for (let i3 = 0; i3 < splitStr.length; i3++) {
            splitStr[i3] = splitStr[i3].charAt(0).toUpperCase() + splitStr[i3].substring(1);
            if(splitStr[i3].charAt(0) === '"' ) {
                splitStr[i3] = '"' + splitStr[i3].charAt(1).toUpperCase() + splitStr[i3].substring(2);
            }
            if(splitStr[i3].includes("-")) {
                let index = splitStr[i3].indexOf("-");
                splitStr[i3] = splitStr[i3].substring(0, index) + "-" + splitStr[i3].charAt(index + 1).toUpperCase() + splitStr[i3].substring(index + 2)
            }
        }
        return splitStr.join(' ');
    }
}