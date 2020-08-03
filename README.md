# Project Overview

## Photo Collaberation App

## Project Description

Allow multiple users to change Contrast, Brightness, Hue,Saturation, Greyscale, or add a Sepia tone. 
The images will display the changes using state variables and CSS filter() effects.
Messages describing the changes will be include with each post. 
The end user will also be able to switch between version of the image by clicking on each message.

## API 

Airtable will be used as the backend database. 
I will leverage two tables to store data, and use the appropriate end points to retreive information.
The userEdits table has a field which stores the imageID which the edits corrispond to. 

Below is an example of the "userEdits" table:
This will hold information regarding the image settings a user has implimented on each of their posts.

```
{
    "records": [
        {
            "id": "recFeFdAjNxqSA8b9",
            "fields": {
                "contrast": 1,
                "hue": 0,
                "imageID": "recCtYFfzpsjzxoZl",
                "grayscale": 0,
                "saturate": 1,
                "brightness": 1,
                "notes": "xzcz",
                "user_email": "photo@danielvera.com",
                "sepia": 0,
                "created_at": "2020-08-02T05:37:51.000Z"
            },
            "createdTime": "2020-08-02T05:37:51.000Z"
        },
```

Below is the "images" table:
This will hold information on each specific image that is added, such as the URL, title and description
```
{
    "records": [
        {
            "id": "recCtYFfzpsjzxoZl",
            "fields": {
                "description": "A truck forces a group of birds to launch into the sky",
                "url": "https://www.danielvera.com/birds/photo01.jpg",
                "title": "Birds Launching"
            },
            "createdTime": "2020-08-02T16:00:37.000Z"
        },

```


## Wireframes

Portrait and Landscape wire frame can be accessed at the link below.
There will be the initial view with a gallery of the images to edit. 
Once one of them is clicked, you will be able to make adjustments with comments.
There will also be a react module to add an image url, with a title and description.

[WireFrame](https://drive.google.com/file/d/16TeBPkuZt_J6Qm0a8-I1bl9J4_v-U9TG/view?usp=sharing)

## Component Hierarchy

```
src
|__ assets/
      |__ fonts
      |__ graphics
      |__ images
|__ components/
      |__ App.js
          |__ Header.js
          |__ Gallery.js
          |__ NewImage.js
          |__ Collaborator.js
                 |__ Photo.js
                 |__ Posts.js
                 |__ Editor.js
```

<br>

### MVP/PostMVP

#### MVP 

- Will build a portrait mobile first interface.
- Display images from URLs of images hosted on another service or locally
- Clicking on an image will allow for the user to make basic edits to the photo.
- The user will be able to leave comments, that can be clicked to display their edits.
- Data will be stored in airtable on two linked tables

#### PostMVP  

- Will render the site in landscape when the user changes orientation.
- Add transition effects and animations when switching images.
- add refresh button to see the latest edits from other users
- impliment styled-components and react-spring
- impliment a full screen display of the current image, with it's edits
- impliment image upload directly thru the interface and storing the files in airtable

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Aug 2| Prompt / Wireframes / Priority Matrix / Timeframes | incomplete
|Aug 3| Project Approval | Complete
|Aug 3| Core Application Structure (React Modules, CSS, Airtable.) | incomplete
|Aug 4| Pseudocode / useEffect, Airtable | incomplete
|Aug 5| Fine tune interface and functionality | incomplete
|Aug 6| MVP | incomplete
|Aug 6| PMVP| incomplete
|Aug 7| Presentations | incomplete

## Priority Matrix

[Photo Editing Collaboration - Priority Matrix](https://drive.google.com/file/d/1KemOEZgHoAKgB_nPExDdLHcy5SStzfyV/view?usp=sharing)

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| JSX, Modules | H | 4hrs| 0hrs | 0hrs |
| CSS| H | 5hrs| 0hrs | 0hrs |
| Working with Airtable | H | 4hrs| 0hrs | 0hrs |
| userEdits display modile | H | 8hrs| 0hrs | 0hrs |
| useEffect(photo editing) | H | 8hrs| 0hrs | 0hrs |
| add image module | H | 3hrs| 0hrs | 0hrs |
| PMVP - Change Layout to landscape | M | 4hrs| 0hrs | 0hrs |
| PMVP - react-spring for transition effects | L | 3hrs| 0hrs | 0hrs |
| PMVP - styled-components | L | 3hrs| 0hrs | 0hrs |
| PMVP - full screen image display | L | 3hrs| 0hrs | 0hrs |
| PMVP - image upload | L | 3hrs| 0hrs | 0hrs |
| Total | H | 48hrs| 0hrs | 0hrs |

## Code Snippet
TBA
```

```

## Change Log

TBA
