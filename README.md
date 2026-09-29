# IEEE-HKN Underground Course Review

A website for browsing anonymous course reviews submitted by Tufts students. Students can search for a course, view ratings and comments from past students, and submit new reviews through a Google Form.

## Overview

This project helps students make more informed decisions about classes by collecting and displaying course feedback in one searchable interface. It is maintained by IEEE-HKN and is designed for quick access to course information without requiring a backend or database.

## Features

- Searchable course dropdown
- Course-specific review cards
- Ratings across multiple dimensions, including:
  - overall course rating
  - overall professor rating
  - workload/time commitment
  - difficulty
  - theoretical vs. project-based emphasis
- Anonymous student comments
- Link to a Google Form for submitting new reviews
- Static site architecture with no server-side app required

## Tech Stack

- HTML
- CSS
- JavaScript
- Google Forms/Google Sheets integration for review data

## Project Structure

- `index.html` — main landing page
- `home.html` — alternate page version with the same content
- `style.css` — page styling and layout
- `responses.js` — CSV parsing and interaction logic for loading review data
- `hkn.png` — HKN branding graphic

## How to Run

Because this is a static site, you can run it by right clicking on the file in vscode and selecting "Open with Live Server"

** Future Work: host this website on an actual live platform!

## Data Source

The site loads course review data from a published Google Sheets CSV URL defined in `responses.js`. This means the reviews update automatically when the source spreadsheet is refreshed.
