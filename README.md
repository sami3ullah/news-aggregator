# Welcome to News Aggregator

> [!IMPORTANT]
> Don't forget to read about the important section below.

[Get Apis](#get-the-apis) <br>
[Project Setup](#project-setup)<br>
[Important](#important)<br>
[Tech Stack](#tech-stack)<br>
[Diagrams For Better Understand](#diagrams-for-better-understanding)
[Some Improvement](#improvement-pointers)

## Get The APis

1. [News Api](https://newsapi.org/)
2. [Guardian Api](https://open-platform.theguardian.com/access/)
3. [Newyork Times APi](https://developer.nytimes.com/docs/articlesearch-product/1/overview)

## Project Setup

#### Clone The Project

`git clone https://github.com/sami3ullah/news-aggregator.git`

#### create an `.env` file in the root of the folder and copy the lines below and replace it with your API keys

```
VITE_GUARDIAN_API_KEY=YOUR_API_KEY_HERE
VITE_NEWS_API_KEY=YOUR_API_KEY_HERE
VITE_NEWYORK_TIMES_API_KEY=YOUR_API_KEY_HERE

```


> ### Installation using Docker

1. Make sure you have docker installed or get it from here [Docker Download](https://www.docker.com/products/docker-desktop/)
2. Run `docker-compose up --build news-aggregator`


> ### Installation using NPM

1. Cd into the folder as `cd news-aggregator` or open the news-aggregator folder
2. Install all the packages `npm i`

> #### Run the project

`npm run dev`

#### Run the tests

`npm test`


## Important

#### Assignment Api resources

In the course of the challenge, I found that out of the provided resources, only three were viable for use. The resources included NewsAPI and NewsAPI.org, which were essentially the same, and Newscred, which had been rebranded as Optimizely. Unfortunately, Optimizely did not offer free APIs, and I didn't find a usable API for BBC content. Consequently, I proceeded with the three available resources: NewsAPI, The Guardian, and The New York Times.

This limited selection posed its own set of challenges. However, I viewed this as an opportunity to address real-world scenarios where not all resources are readily accessible or fully compatible with the desired functionalities. In navigating these constraints, I aimed to demonstrate adaptability and problem-solving skills, essential qualities in the field. Therefore, despite the restricted options, I proceeded with the available APIs, acknowledging that such challenges are commonplace and necessitate resourcefulness to overcome.

#### Api Usage

Given the absence of specific instructions regarding API usage, I focused primarily on NewsAPI, leveraging its diverse sources and categories to build most of the functionality. The remaining APIs were also used but it was mostly for completing the challenge, allowing for a comprehensive approach to the project.

Overall,

- Upon the initial loading of the page, The New York Times API serves as the primary data source.
- The Guardian API is exclusively utilized for conducting searches within the application.
- For tasks such as filtering and managing user preferences, NewsAPI is the preferred API.
- Notably, when users apply filters or set preferences and subsequently perform a search, NewsAPI's extensive filtering functionalities are activated.
- Conversely, if no filters or preferences are set and a search is initiated, the Guardian API is dynamically employed to handle the search query.

#### Assumptions

1. Given the nature of these free APIs, it's important to anticipate certain limitations, such as constraints on querying extensive data and potential delays in response times due to their slower nature.
2. There is no necessity to conduct simultaneous searches across all three APIs; instead, each API can be utilized individually as per the specific requirements.
3. An application of this nature is ideally developed within a framework like Next.js, benefiting from Server-Side Rendering capabilities that facilitate features such as SEO optimization. However, given the challenge's specification to construct the application in React, I proceeded accordingly. While Next.js is built upon React.js, I treated them as distinct entities for the purposes of this project.

## Tech Stack

1. ReactJs ( Ofcourse )
2. Typescript (I mean why you would not )
3. Tailwind Css ( For quick styling )
4. Shadcn ( For beautiful styled components )
5. Axios (Because I like it more than Fetch )
6. ReactQuery ( For Caching queries and lot of other cool stuff )
7. Zustand ( For state Management. Since it's relatively not a giant app so it's great and I love it :3 )
8. Vitest ( For awesome testing experince )

## Diagrams For Better Understanding

[Architecture Diagrams](https://app.eraser.io/workspace/iz8b8rd6fiKfL4Ocqv1i?origin=share)

# Improvement Pointers

1. Integrate a sleep mechanism to handle rate-limiting errors.
2. Write more unit tests + integration and end to end tests.
3. Global state can be further broken down.
