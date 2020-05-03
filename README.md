# DialekTech
TOHacks 2020 Submission: The all-comprehensive educational video analyzer.

![](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/083/696/datas/gallery.jpg)

### Check out our video demo at the _most recent_ upload to this channel!
[DialekTech Demo Channel](https://www.youtube.com/channel/UCDLqHTKiUbuqK-6a7P5lEeQ?view_as=subscriber)

## Inspiration
In a time where students have to rely on limited online resources more than anything to complete their education, many can find it tedious and stressful to be academically successful. This is most prevalent in online learning platforms for teachers to conduct lessons, as what can be communicated via a screen may not be as effective or comprehensible as a real classroom setting. As students ourselves, we find it difficult to be able to find clear and concise answers to questions when the teacher is not available. With DialekTech, students are able to have a more interactive learning experience, and are able to pull answers for specific questions from long lectures.

## What it does
DialekTech takes in long video lessons and queries for the answers to specific questions asked by students. Using the Sørensen–Dice coefficient, Dialektech allows students to find the timestamp of the question asked. With the help of DCP, the process of doing this for many students learning many lessons can be computed efficiently.

## How we built it
Using FFMPeg and Google Cloud's Speech-to-Text API, we are able to convert mp4 video data into flac audio data and then into a transcript complete with precise timestamps for each word recognized. The transcript data is stored and communicated via MongoDB. The question by the student is then compared with different sections of the transcript using the Sørensen–Dice coefficient. In order to process large amounts of text in this way, we use a Distributed Compute Protocol (DCP), to compute this efficiently. Finally, the timestamp of the most similar section is given to the student to provide an efficient way to search for solutions. This project is built with Node.js.

## Challenges we ran into
Being unfamiliar with the new NPM library, we ran into challenges setting up the website while using the NPM command-line client. We also had a hard time working with DCP, due to unfamiliarity with the concept and the limited resources for it. Furthermore, we had to learn from scratch how to use Google Cloud's Speech-to-Text API.

## Accomplishments that we're proud of
We were able to create a successful application with several parts that we were previously unfamiliar with. We were able to use a wide variety of different tools ranging from machine learning API to speech-to-text recognition algorithms, to distributed computing algorithms.

## What we learned
By using DCP, we were able to make the queries much more efficient,  as we were able to use a distributed system to get other networked computers to do the computation. Also, by using Google Cloud's Speech-to-Text API, we were able to convert audio to text by applying powerful neural network models.

## What's next for DialekTech
While the Sørensen–Dice coefficient is more effective than other string-comparison algorithms such as Jaccard or Levenshtein, DialekTech can continue to improve its understanding of topics in a question or lecture using natural language processing, possible with the help of Jensen-Shannon divergence.
