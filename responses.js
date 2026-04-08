// Javascript file to fetch responses from google form 
const API_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQAEeLu5HtfbaTLOLK_fXCPtRyX6ax0QW1MP4X4lux8yyL6mlIxDbDay7TYas2IOO9x2rjhyQ1fy6k3/pub?output=csv";

async function loadResponses() {
    const res = await fetch(API_URL);
    const csv = await res.text();
    allData = parseCSV(csv);
    allCourses = [...new Set(allData.map(row => row["Name of Course"]))].filter(Boolean);
    filterCourses(document.getElementById("courseInput").value);
}

function parseCSV(csv) {
    const lines = csv.trim().split("\n");
    const headers = parseCSVLine(lines[0]);
    return lines.slice(1).map(line => {
        const values = parseCSVLine(line);
        return headers.reduce((obj, header, i) => {
        obj[header.trim()] = (values[i] || "").trim();
        return obj;
        }, {});
    });
}

function parseCSVLine(line) {
    const result = [];
    let current = "";
    let insideQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
        insideQuotes = !insideQuotes;
        } else if (char === "," && !insideQuotes) {
        result.push(current);
        current = "";
        } else {
        current += char;
        }
    }
    result.push(current);
    return result;
}

let allCourses = [];
let allData = [];

function filterCourses(query) {
    const dropdown = document.getElementById("courseDropdown");
    dropdown.innerHTML = "";

    // Show all courses if query is empty, otherwise filter
    const q = query.toLowerCase();
    const matches = q.trim()
        ? allCourses.filter(name => name.toLowerCase().includes(q))
        : allCourses;

    matches.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        li.onclick = () => selectCourse(name);
        dropdown.appendChild(li);
    });
}

function renderStars(rating) {
    return Array.from({ length: 10 }, (_, i) => {
        const filled = i < rating ? "#EF9F27" : "var(--color-border-secondary)";
        return `<svg viewBox="0 0 16 16" style="width:16px;height:16px;">
        <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" fill="${filled}"/>
        </svg>`;
    }).join("");
}

function renderCourseCard(entry) {
    const commentsKey = Object.keys(entry).find(k => k.startsWith("Comments"));
    const comments = entry[commentsKey] || "No comments provided.";

    return `
        <div style="background:var(--color-background-primary); border:0.5px solid var(--color-border-tertiary); border-radius:var(--border-radius-lg); padding:1.25rem 1.5rem; margin-top:1.5rem;">
        
        <div style="margin-bottom:1rem; padding-bottom:1rem; border-bottom:0.5px solid var(--color-border-tertiary);">
            <p style="font-size:18px; font-weight:500; margin:0 0 2px; color:var(--color-text-primary);">${entry["Name of Course"]}</p>
            <p style="font-size:13px; color:var(--color-text-secondary); margin:0;">${entry["Name of Professor"]} &nbsp;·&nbsp; ${entry["Semester/year taken"]}</p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:1rem;">
            <div style="background:var(--color-background-secondary); border-radius:var(--border-radius-md); padding:10px 12px;">
            <p style="font-size:12px; color:var(--color-text-secondary); margin:0 0 6px;">Overall course rating</p>
            <div style="display:flex; gap:3px;">${renderStars(entry["Overall Rating of the Course"])}</div>
            </div>
            <div style="background:var(--color-background-secondary); border-radius:var(--border-radius-md); padding:10px 12px;">
            <p style="font-size:12px; color:var(--color-text-secondary); margin:0 0 6px;">Overall professor rating</p>
            <div style="display:flex; gap:3px;">${renderStars(entry["Overall Rating of the Professor"])}</div>
            </div>
            <div style="background:var(--color-background-secondary); border-radius:var(--border-radius-md); padding:10px 12px;">
            <p style="font-size:12px; color:var(--color-text-secondary); margin:0 0 6px;">Workload / time commitment</p>
            <div style="display:flex; gap:3px;">${renderStars(entry["Workload/Time Commitment"])}</div>
            </div>
            <div style="background:var(--color-background-secondary); border-radius:var(--border-radius-md); padding:10px 12px;">
            <p style="font-size:12px; color:var(--color-text-secondary); margin:0 0 6px;">Difficulty of material</p>
            <div style="display:flex; gap:3px;">${renderStars(entry["Difficulty of Material"])}</div>
            </div>
            <div style="background:var(--color-background-secondary); border-radius:var(--border-radius-md); padding:10px 12px; grid-column:span 2;">
            <p style="font-size:12px; color:var(--color-text-secondary); margin:0 0 6px;">Theoretical ←→ project based</p>
            <div style="display:flex; gap:3px;">${renderStars(entry["Is this class more theoretical or project based?"])}</div>
            </div>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:1rem;">
            <div style="font-size:12px; padding:4px 10px; border-radius:var(--border-radius-md); background:var(--color-background-secondary); color:var(--color-text-secondary); border:0.5px solid var(--color-border-tertiary);">
            Recitation: <strong style="color:var(--color-text-primary); font-weight:500;">${entry["Recitation?"]}</strong>
            </div>
            <div style="font-size:12px; padding:4px 10px; border-radius:var(--border-radius-md); background:var(--color-background-secondary); color:var(--color-text-secondary); border:0.5px solid var(--color-border-tertiary);">
            Labs: <strong style="color:var(--color-text-primary); font-weight:500;">${entry["Labs?"]}</strong>
            </div>
            <div style="font-size:12px; padding:4px 10px; border-radius:var(--border-radius-md); background:var(--color-background-secondary); color:var(--color-text-secondary); border:0.5px solid var(--color-border-tertiary);">
            Flipped Classroom: <strong style="color:var(--color-text-primary); font-weight:500;">${entry["Flipped classroom?"]}</strong>
            </div>
            <div style="font-size:12px; padding:4px 10px; border-radius:var(--border-radius-md); background:var(--color-background-secondary); color:var(--color-text-secondary); border:0.5px solid var(--color-border-tertiary);">
            Final Exam/Project: <strong style="color:var(--color-text-primary); font-weight:500;">${entry["Final project / exam?"]}</strong>
            </div>
        </div>

        <div style="background:var(--color-background-secondary); border-radius:var(--border-radius-md); padding:12px 14px;">
            <p style="font-size:12px; color:var(--color-text-secondary); margin:0 0 6px; font-weight:500;">Comments:</p>
            <p style="font-size:13px; color:var(--color-text-primary); line-height:1.6; margin:0;">${comments}</p>
        </div>

        </div>`;
}

function selectCourse(name) {
    document.getElementById("courseInput").value = name;
    document.getElementById("courseDropdown").innerHTML = "";

    const entries = allData.filter(row => row["Name of Course"] === name);
    const resultsEl = document.getElementById("courseResults");
    resultsEl.innerHTML = entries.map(renderCourseCard).join("");
}

// Close dropdown if user clicks elsewhere
document.addEventListener("click", e => {
    if (!e.target.closest("#courseInput") && !e.target.closest("#courseDropdown")) {
        document.getElementById("courseDropdown").innerHTML = "";
    }
});

// Clear search button
function clearSearch() {
    document.getElementById("courseInput").value = "";
    document.getElementById("courseDropdown").innerHTML = "";
    document.getElementById("courseResults").innerHTML = "";
}

loadResponses();
setInterval(loadResponses, 30000);