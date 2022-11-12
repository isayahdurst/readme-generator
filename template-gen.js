'use strict';

const chalk = require('chalk');
const fs = require('fs');
const inquirer = require('inquirer');
const title = chalk.red;

const initQuestions = [
    {
        type: 'input',
        message: 'Enter the URL for your GitHub Repo:\nhttps://www.github.com/',
        name: 'repoAddress',
    },
    {
        type: 'checkbox',
        message: 'Choose desired README sections:',
        name: 'sections',
        choices: [
            'About',
            'Built With',
            'Prerequisites',
            'Installation',
            'Usage',
            'Roadmap',
            'Contributing',
            'License',
            'Contact',
            'Tests',
            'Questions',
            'Acknowledgements',
        ],
        default: [
            'About',
            'Installation',
            'Usage',
            'Roadmap',
            'License',
            'Contact',
        ],
    },
];

//TODO: add more badges to this list from the internet. Add link to badge.
const badges = {
    languages: {
        C: {
            badgeURL:
                'https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white',
            siteURL: 'https://devdocs.io/c/',
        },

        'C#': {
            badgeURL:
                'https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white',
            siteURL: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
        },

        'C++': {
            badgeURL:
                'https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white',
            siteURL: 'https://isocpp.org/',
        },

        CSS: {
            badgeURL:
                'https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white',
            siteURL: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        },

        GO: {
            badgeURL:
                'https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white',
            siteURL: 'https://go.dev/',
        },

        GraphQL: {
            badgeURL:
                'https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white',
            siteURL: 'https://graphql.org/',
        },

        Haskell: {
            badgeURL:
                'https://img.shields.io/badge/Haskell-5e5086?style=for-the-badge&logo=haskell&logoColor=white',
            siteURL: 'https://www.haskell.org/documentation/',
        },

        HTML: {
            badgeURL:
                'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white',
            siteURL: 'https://html.spec.whatwg.org/multipage/',
        },

        Java: {
            badgeURL:
                'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white',
            siteURL: 'https://docs.oracle.com/en/java/javase/19/',
        },

        JavaScript: {
            badgeURL:
                'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E',
            siteURL: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        },

        Lua: {
            badgeURL:
                'https://img.shields.io/badge/lua-%232C2D72.svg?style=for-the-badge&logo=lua&logoColor=white',
            siteURL: 'https://www.lua.org/',
        },

        Markdown: {
            badgeURL:
                'https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white',
            siteURL: 'https://www.markdownguide.org/',
        },

        Perl: {
            badgeURL:
                'https://img.shields.io/badge/perl-%2339457E.svg?style=for-the-badge&logo=perl&logoColor=white',
            siteURL: 'https://perldoc.perl.org/',
        },

        PHP: {
            badgeURL:
                'https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white',
            siteURL: 'https://www.php.net/docs.php',
        },

        Python: {
            badgeURL:
                'https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54',
            siteURL: 'https://docs.python.org/3/',
        },

        Ruby: {
            badgeURL:
                'https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white',
            siteURL: 'https://www.ruby-lang.org/en/documentation/',
        },

        Rust: {
            badgeURL:
                'https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white',
            siteURL: 'https://www.rust-lang.org/learn',
        },

        Solidity: {
            badgeURL:
                'https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white',
            siteURL: 'https://soliditylang.org/',
        },

        TypeScript: {
            badgeURL:
                'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white',
            siteURL: 'https://www.typescriptlang.org/docs/',
        },
    },

    frameworks: {
        '.NET': {
            badgeURL:
                'https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white',
            siteURL: 'https://learn.microsoft.com/en-us/dotnet/',
        },

        Angular: {
            badgeURL:
                'https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white',
            siteURL: 'https://angular.io/docs',
        },

        Bootstrap: {
            badgeURL:
                'https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white',
            siteURL:
                'https://getbootstrap.com/docs/4.1/getting-started/introduction/',
        },

        Bulma: {
            badgeURL:
                'https://img.shields.io/badge/bulma-00D0B1?style=for-the-badge&logo=bulma&logoColor=white',
            siteURL: 'https://bulma.io/documentation/',
        },

        'Chart.js': {
            badgeURL:
                'https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white',
            siteURL: 'https://www.chartjs.org/docs/latest/',
        },

        Django: {
            badgeURL:
                'https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white',
            siteURL: 'https://docs.djangoproject.com/en/4.1/',
        },

        'Express.js': {
            badgeURL:
                'https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB',
            siteURL: 'https://expressjs.com/',
        },

        JQuery: {
            badgeURL:
                'https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white',
            siteURL: 'https://api.jquery.com/',
        },

        NPM: {
            badgeURL:
                'https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white',
            siteURL: 'https://docs.npmjs.com/',
        },

        Next: {
            badgeURL:
                'https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white',
            siteURL: 'https://nextjs.org/docs',
        },

        'Node.js': {
            badgeURL:
                'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white',
            siteURL: 'https://nodejs.org/en/docs/',
        },

        React: {
            badgeURL:
                'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB',
            siteURL: 'https://reactjs.org/docs/getting-started.html',
        },

        Redux: {
            badgeURL:
                'https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white',
            siteURL: 'https://redux.js.org/',
        },

        Remix: {
            badgeURL:
                'https://img.shields.io/badge/remix-%23000.svg?style=for-the-badge&logo=remix&logoColor=white',
            siteURL: 'https://remix.run/docs/en/v1',
        },

        SASS: {
            badgeURL:
                'https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white',
            siteURL: 'https://sass-lang.com/documentation/',
        },

        TailwindCSS: {
            badgeURL:
                'https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white',
            siteURL: 'https://tailwindcss.com/docs/installation',
        },

        'Three.js': {
            badgeURL:
                'https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white',
            siteURL: 'https://threejs.org/',
        },

        'Vue.js': {
            badgeURL:
                'https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D',
            siteURL: 'https://vuejs.org/',
        },

        Webpack: {
            badgeURL:
                'https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black',
            siteURL: 'https://webpack.js.org/',
        },

        'Web3.js': {
            badgeURL:
                'https://img.shields.io/badge/web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white',
            siteURL: 'https://web3js.readthedocs.io/en/v1.8.1/',
        },
    },

    social: {
        Email: {
            badgeURL:
                'https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white',
            siteURL: `mailto:`,
        },

        LinkedIn: {
            badgeURL:
                'https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white',
            siteURL: 'https://www.linkedin.com/in/',
        },

        Twitter: {
            badgeURL:
                'https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white',
            siteURL: 'https://www.twitter.com/',
        },

        TikTok: {
            badgeURL:
                'https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white',
            siteURL: 'https://www.tiktok.com/@',
        },

        Instagram: {
            badgeURL:
                'https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white',
            siteURL: 'https://www.instagram.com/',
        },

        LinkTree: {
            badgeURL:
                'https://img.shields.io/badge/linktree-39E09B?style=for-the-badge&logo=linktree&logoColor=white',
            siteURL: 'https://linktr.ee/',
        },

        GitHub: {
            badgeURL:
                'https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white',
            siteURL: `https://www.github.com/`,
        },
    },

    // ADD databases, hosting, social, version control
};

(async function () {
    const template = {
        sectionList: [],
        referenceLinks: `
        <!-- MARKDOWN LINKS & IMAGES -->
        <!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->\n\n`,
        builtWithBadges: ``,
        socialBadges: ``,
        about: ``,
        prerequisites: ``,

        async init() {
            const init = await inquirer.prompt(initQuestions);

            const { repoAddress, sections } = init;
            this.repoPath = repoAddress;
            this.githubUsername = repoAddress.split('/')[0];
            badges.social.GitHub.siteURL += this.githubUsername;
            await this.getGitHubData(repoAddress);

            for (const section of sections) {
                console.clear();
                await template[`create${section.split(' ').join('')}`]();
            }

            this.sectionList = sections;
        },

        async getGitHubData(repo) {
            const response = await fetch(
                `https://api.github.com/repos/${repo}`
            );
            const gitHubData = await response.json();
            const { name, html_url, language, license } = gitHubData;
            this.githubData = gitHubData;
            console.log(this.gitHubData);

            if (name) {
                this.projectName = name;
                this.githubURL = html_url;
                this.pulledLanguages = language;
                this.licenseType = license.name;
                let formattedName = name.replaceAll('-', ' ');
                formattedName = formattedName.replaceAll('_', ' ');
                formattedName = formattedName
                    .split(' ')
                    .map((word) => {
                        const [first, ...rest] = word;
                        return [first.toUpperCase(), ...rest].join('');
                    })
                    .join(' ');

                console.clear();

                const promptChoices = [
                    'Yes',
                    `Yes, but format first (${chalk.blue(formattedName)})`,
                    'No, use a custom name',
                ];
                console.log(title('Basic Project Details:'));
                const response = await inquirer.prompt([
                    {
                        type: 'list',
                        message: `We have located your project on GitHub with the name of: ${chalk.greenBright.bold(
                            name
                        )}\nWould you like to make this your project name?`,
                        name: 'confirmProjectName',
                        choices: promptChoices,
                    },
                    {
                        type: 'input',
                        message: 'Write a brief description of your project.',
                        name: 'projectDescription',
                    },
                ]);

                response.confirmProjectName === promptChoices[1]
                    ? (this.projectName = formattedName)
                    : null;

                if (response.confirmProjectName === promptChoices[2]) {
                    const response = await inquirer.prompt([
                        {
                            type: 'input',
                            message:
                                'What would you like to call this project?',
                            name: 'newProjectName',
                        },
                    ]);

                    this.projectName = response.newProjectName;
                }

                this.projectDescription = response.projectDescription;
            }
        },

        async createAbout() {
            console.log(
                chalk.red(
                    '\nLet\'s create your "ABOUT" section!\nWe will ask you a few questions, you just provide the answers.\nIf you do not wish to answer, press "ENTER".\n'
                )
            );

            const response = await inquirer.prompt([
                {
                    type: 'input',
                    message:
                        'What was the motivation behind building this project?',
                    name: 'motivation',
                },
                {
                    type: 'input',
                    message: 'Why did you build this project?',
                    name: 'why',
                },
                {
                    type: 'input',
                    message: 'What problem does it solve?',
                    name: 'problem',
                },
                {
                    type: 'input',
                    message: 'What did you learn?',
                    name: 'learn',
                },
            ]);

            const { motivation, why, problem, learn } = response;

            template.about = `
            ${
                motivation
                    ? `What was the motivation behind creating this project?\n\n${motivation}`
                    : ''
            }
            ${why ? `\n\nWhy was the project built?\n\n${why}` : ''}
            ${
                problem
                    ? `\n\nWhat problem does this project solve?\n\n${problem}`
                    : ''
            }
            ${
                learn
                    ? `\n\nWhat was learned through making this project?\n\n${learn}`
                    : ''
            }


            `;
        },

        async createBuiltWith() {
            const response = await fetch(
                `https://api.github.com/repos/${this.repoPath}/languages`
            );

            const detectedLanguages = await response.json();
            const defaultLanguages = [...Object.keys(detectedLanguages)];

            console.log(
                `We have detected the following languages from your repository:\n${chalk.green(
                    defaultLanguages.join(', ')
                )}\n`
            );

            const badgesUsed = await inquirer.prompt([
                {
                    type: 'checkbox',
                    message: 'Add additional languages:',
                    name: 'languages',
                    choices: [...Object.keys(badges.languages)],
                    default: defaultLanguages,
                },
                {
                    type: 'checkbox',
                    message: 'Select any frameworks used in this project:',
                    name: 'frameworks',
                    choices: [...Object.keys(badges.frameworks)],
                },
            ]);

            const { languages, frameworks } = badgesUsed;

            this.addBadge(languages, badges.languages);
            this.addBadge(frameworks, badges.frameworks);
            // TODO: Add more badge types here and destructure them from the badges used object.

            template.builtWith = `## Built With:
            ${this.builtWithBadges}
            `;
        },

        async createPrerequisites() {
            template.prerequisites = `## Prerequisites:
            
            Below is the software required to run this program and the steps to install them:

            `;
            const steps = await this.addStep('prerequisite');
            for (const stepEntry of steps) {
                const { stepNumber, step, stepTitle, textStyle } = stepEntry;
                this.prerequisites += `- ${stepNumber}: ${stepTitle}
                \`\`\`${textStyle}
                ${step}
                \`\`\`\n\n`;
            }
        },

        async createInstallation() {
            template.installation = `## Installation:
            
            `;

            const steps = await this.addStep('installation');
            for (const stepEntry of steps) {
                const { stepNumber, step, stepTitle, textStyle } = stepEntry;
                this.installation += `- ${stepNumber}: ${stepTitle}
                \`\`\`${textStyle}
                ${step}
                \`\`\`\n\n`;
            }
        },

        async createUsage() {
            template.usage = `## Usage:
            
            `;

            const steps = await this.addStep('usage');
            for (const stepEntry of steps) {
                const { stepNumber, step, stepTitle, textStyle } = stepEntry;
                this.usage += `- ${stepNumber}: ${stepTitle}
                \`\`\`${textStyle}
                ${step}
                \`\`\`\n\n`;
            }
        },

        async createRoadmap() {
            template.roadmap = `## Roadmap:
            
            `;

            const steps = await this.addStep('roadmap');
            for (const stepEntry of steps) {
                const { stepNumber, step, stepTitle, textStyle } = stepEntry;
                this.roadmap += `- [ ] ${stepTitle}: ${step}\n`;
            }
        },

        async createContributing() {
            this.contributing = `## Contributing

            Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
            
            If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
            Don't forget to give the project a star! Thanks again!
            
            1. Fork the Project
            2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
            3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
            4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
            5. Open a Pull Request`;

            const response = await inquirer.prompt([
                {
                    type: 'confirm',
                    message:
                        'Would you like to continue with the default contribution template? ',
                    name: 'default',
                },
            ]);

            if (!response.default) {
                this.contributing = `## Contributing
                
                `;
                const steps = await this.addStep('contributing');
                for (const stepEntry of steps) {
                    const { stepNumber, step, stepTitle, textStyle } =
                        stepEntry;
                    this.contributing += `- ${stepNumber}${stepTitle}
                    \`\`\`${textStyle}
                    ${step}
                    \`\`\`\n\n`;
                }
            }
        },

        async createLicense() {
            if (!this.licenseType) {
                const response = await inquirer.prompt([
                    {
                        type: 'input',
                        message: `${chalk.yellow(
                            `Auto-Detect Failed.`
                        )} Please enter license type:`,
                        name: 'licenseType',
                    },
                ]);

                this.licenseType = response.licenseType;
            }
            this.license = `<!-- LICENSE -->

            ## License
            
            Distributed under the ${this.licenseType} License. See \`LICENSE.txt\` for more information.
            
            <p align="right">(<a href="#readme-top">back to top</a>)</p>`;
        },

        async createContact() {
            console.clear();
            console.log(title('Contact Section: Step 1 - Select Options'));
            const response = await inquirer.prompt([
                {
                    type: 'checkbox',
                    message:
                        'Please select the contact options you wish to include:',
                    name: 'contactOptions',
                    choices: [...Object.keys(badges.social)],
                    default: ['Email', 'LinkedIn', 'GitHub'],
                },
            ]);

            const { contactOptions } = response;

            const appendLinks = async function (options) {
                for (const link of options) {
                    if (link != 'GitHub') {
                        console.clear();
                        console.log(
                            title('Contact Section: Step 2 - Finish URL')
                        );
                        const response = await inquirer.prompt([
                            {
                                type: 'input',
                                message: `${link}| ${badges.social[link].siteURL}`,
                                name: 'completeURL',
                            },
                        ]);

                        const { completeURL } = response;
                        badges.social[link].siteURL += completeURL;
                    }
                }
            };
            await appendLinks(contactOptions);
            this.addBadge(contactOptions, badges.social, 'social');
            console.log(this.socialBadges);
        },

        async createAcknowledgements() {
            console.log(title('Acknowledgements'));
            const getResponse = async function (list) {
                const response = await inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Who would you like to thank?',
                        name: 'thanks',
                    },
                ]);
                const { thanks } = response;

                if (thanks) {
                    list.push(thanks);
                    return getResponse(list);
                }

                return list;
            };

            const list = await getResponse([]);
            this.acknowledgements = ``;
            for (const acknowledgement of list) {
                this.acknowledgements += `- ${acknowledgement}\n`;
            }
        },

        async createTests() {
            console.log(title('Tests:'));
            const getResponse = async function (list) {
                const response = await inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Please state a test step:',
                        name: 'test',
                    },
                ]);
                const { test } = response;

                if (test) {
                    list.push(test);
                    return getResponse(list);
                }

                return list;
            };

            const list = await getResponse([]);
            this.tests = ``;
            list.forEach(function (test, index) {
                template.tests += `- ${index + 1}. ${test}\n`;
            });
        },

        async createQuestions() {
            console.log(title('Questions:'));
            const getResponse = async function (list) {
                const response = await inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Create a question:',
                        name: 'question',
                    },
                ]);
                const { question } = response;

                if (question) {
                    const answer = await inquirer.prompt([
                        {
                            type: 'input',
                            message: `${question}`,
                            name: 'answer',
                        },
                    ]);

                    list.push({ question: question, answer: answer.answer });
                    return getResponse(list);
                }

                return list;
            };

            const list = await getResponse([]);
            this.questions = ``;
            for (const entry of list) {
                const { question, answer } = entry;
                this.questions += `- ${question}
                \`\`\`
                ${answer}
                \`\`\`
                \n\n`;
            }
        },

        addBadge(badges, badgeType, badgeTypeString) {
            for (const badge of badges) {
                template.referenceLinks += `[${badge}-badge]: ${badgeType[badge].badgeURL}\n[${badge}-url]: ${badgeType[badge].siteURL}\n`;

                if (badgeTypeString === 'social') {
                    template.socialBadges += `\n- [![${badge}][${badge}-badge]][${badge}-url]`;
                } else {
                    template.builtWithBadges += `\n- [![${badge}][${badge}-badge]][${badge}-url]`;
                }
            }
        },

        async addStep(stepType, stepNumber = 1, list = []) {
            const styleChoices = ['none', 'js', 'sh'];
            const message = {
                prerequisite: `Please add a prerequisite or press ENTER to skip.\nPrereq #: ${stepNumber}`,
                installation: `Please add an installation step or press ENTER to skip.\nStep: ${stepNumber}`,
                usage: `Add a usage example or press ENTER to skip.`,
                roadmap: `Describe a new milestone on your roadmap or press ENTER to skip.`,
                contributing: `Add a step for contributing to the project. Press ENTER if finished.`,
            };
            const stepList = list;

            const response = await inquirer.prompt([
                {
                    type: 'input',
                    message: `${message[stepType]}`,
                    name: 'step',
                },
            ]);

            const { step } = response;

            if (step) {
                const stepDetails = await inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What should we title this?',
                        name: 'stepTitle',
                    },
                    {
                        type: 'list',
                        message: 'Should we add any styling?',
                        name: 'textStyle',
                        choices: styleChoices,
                    },
                ]);
                const { stepTitle, textStyle } = stepDetails;
                stepList.push({
                    step: step,
                    stepTitle: stepTitle,
                    textStyle: textStyle,
                    stepNumber: stepNumber,
                });
                stepNumber++;
                await this.addStep(stepType, stepNumber, stepList);
            }

            return stepList;
        },

        createTableOfContents() {
            return `<!-- TABLE OF CONTENTS -->
            <details>
                <summary>Table of Contents</summary>
                <ol>
                ${
                    this.sectionList.includes('About')
                        ? `<li>
                    <a href="#about-the-project">About The Project</a>
                    ${
                        this.sectionList.includes('Built With')
                            ? `<ul>
                    <li><a href="#built-with">Built With</a></li>
                    </ul>`
                            : ''
                    }
                </li>`
                        : ''
                }
                ${
                    this.sectionList.includes('Prerequisites') ||
                    this.sectionList.includes('Installation')
                        ? `<li>
                    <a href="#getting-started">Getting Started</a>
                    <ul>
                    ${
                        this.sectionList.includes('Prerequisites')
                            ? `<li><a href="#prerequisites">Prerequisites</a></li>`
                            : ''
                    }
                    ${
                        this.sectionList.includes('Installation')
                            ? `<li><a href="#installation">Installation</a></li>`
                            : ''
                    }
                    </ul>
                </li>`
                        : ''
                }
                ${
                    this.sectionList.includes('Usage')
                        ? `<li><a href="#usage">Usage</a></li>`
                        : ''
                }
                ${
                    this.sectionList.includes('Roadmap')
                        ? `<li><a href="#roadmap">Roadmap</a></li>`
                        : ''
                }
                ${
                    this.sectionList.includes('Contributing')
                        ? `<li><a href="#contributing">Contributing</a></li>`
                        : ''
                }
                ${
                    this.sectionList.includes('License')
                        ? `<li><a href="#license">License</a></li>`
                        : ''
                }
                ${
                    this.sectionList.includes('Contact')
                        ? `<li><a href="#contact">Contact</a></li>`
                        : ''
                }
                ${
                    this.sectionList.includes('Tests')
                        ? `<li><a href="#tests">Tests</a></li>`
                        : ''
                }
                ${
                    this.sectionList.includes('Questions')
                        ? `<li><a href="#questions">Questions</a></li>`
                        : ''
                }
                ${
                    this.sectionList.includes('Acknowledgements')
                        ? `<li><a href="#acknowledgments">Acknowledgments</a></li>`
                        : ''
                }
                </ol>
            </details>`;
        },

        createTemplate() {
            const template = `
            <a name="readme-top"></a>

            [![Contributors][contributors-shield]][contributors-url]
            [![Forks][forks-shield]][forks-url]
            [![Stargazers][stars-shield]][stars-url]
            [![Issues][issues-shield]][issues-url]
            [![MIT License][license-shield]][license-url]
            [![LinkedIn][linkedin-shield]][linkedin-url]

            <!-- PROJECT LOGO -->
            <br />
            <div align="center">
                <a href="https://www.github.com/${this.repoPath}">
                <!-- <img src="LOGO_SOURCE" alt="Logo" width="80" height="80"> -->
                </a>

            <h3 align="center">${this.projectName}</h3>
                <p align="center">
                ${this.projectDescription}
                <br />
                <a href="https://www.github.com/${
                    this.repoPath
                }"><strong>Explore the docs »</strong></a>
                <br />
                <br />
                <a href="https://www.github.com/${this.repoPath}">View Demo</a>
                ·
                <a href="https://www.github.com/${
                    this.repoPath
                }/issues">Report Bug</a>
                ·
                <a href="https://www.github.com/${
                    this.repoPath
                }/issues">Request Feature</a>
                </p>
            </div>
            
            <!-- TABLE OF CONTENTS -->

            ${this.createTableOfContents().replace(/^ +/gm, '')}

            <!-- ABOUT THE PROJECT -->

            ## About The Project

            <!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

            ${this.about}

            <p align="right">(<a href="#readme-top">back to top</a>)</p>

            ## Built With:

            ${this.builtWithBadges}

            <p align="right">(<a href="#readme-top">back to top</a>)</p>

            <!-- GETTING STARTED -->

            ## Getting Started:

            Please reference the prerequisites / installation guides below to begin using this program.

            ${this.prerequisites}

            <p align="right">(<a href="#readme-top">back to top</a>)</p>

            ${this.installation}

            <p align="right">(<a href="#readme-top">back to top</a>)</p>

            <!-- USAGE EXAMPLES -->

            ${this.usage}

            <p align="right">(<a href="#readme-top">back to top</a>)</p>

            <!-- ROADMAP -->

            ${this.roadmap}

            <p align="right">(<a href="#readme-top">back to top</a>)</p>

            <!-- CONTRIBUTING -->

            ${this.contributing}

            <p align="right">(<a href="#readme-top">back to top</a>)</p>

            <!-- LICENSE -->

            ${this.license}

            <!-- CONTACT -->

            ## Contact:

            ${this.socialBadges}

            <p align="right">(<a href="#readme-top">back to top</a>)</p>

            ## Tests:

            ${this.tests}

            <p align="right">(<a href="#readme-top">back to top</a>)</p>

            ## Questions

            ${this.questions}

            <p align="right">(<a href="#readme-top">back to top</a>)</p>

            <!-- ACKNOWLEDGMENTS -->

            ## Acknowledgments

            ${this.acknowledgements}

            <p align="right">(<a href="#readme-top">back to top</a>)</p>

            <!-- MARKDOWN LINKS & IMAGES -->
            <!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

            [contributors-shield]: https://img.shields.io/github/contributors/${
                this.repoPath
            }.svg?style=for-the-badge
            [contributors-url]: https://www.github.com/${
                this.repoPath
            }/graphs/contributors
            [forks-shield]: https://img.shields.io/github/forks/${
                this.repoPath
            }.svg?style=for-the-badge
            [forks-url]: https://www.github.com/${this.repoPath}/network/members
            [stars-shield]: https://img.shields.io/github/stars/${
                this.repoPath
            }.svg?style=for-the-badge
            [stars-url]: https://www.github.com/${this.repoPath}/stargazers
            [issues-shield]: https://img.shields.io/github/issues/${
                this.repoPath
            }.svg?style=for-the-badge
            [issues-url]: https://www.github.com/${this.repoPath}/issues
            [license-shield]: https://img.shields.io/github/license/${
                this.repoPath
            }.svg?style=for-the-badge
            [license-url]: https://www.github.com/${
                this.repoPath
            }/blob/master/LICENSE.txt
            [linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
            [product-screenshot]: images/screenshot.png

            ${this.referenceLinks}
`;

            fs.writeFile('README.md', template.replace(/^ +/gm, ''), (err) => {
                err ? console.log(err) : console.log('Saved Successfully');
            });
        },
    };

    console.clear();
    await template.init();
    template.createTemplate();
})();
