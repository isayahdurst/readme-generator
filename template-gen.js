'use strict';

const fs = require('fs');
const inquirer = require('inquirer');

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
            siteURL: '',
        },

        Angular: {
            badgeURL:
                'https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white',
            siteURL: '',
        },

        Bootstrap: {
            badgeURL:
                'https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white',
            siteURL: '',
        },

        Bulma: {
            badgeURL:
                'https://img.shields.io/badge/bulma-00D0B1?style=for-the-badge&logo=bulma&logoColor=white',
            siteURL: '',
        },

        'Chart.js': {
            badgeURL:
                'https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white',
            siteURL: '',
        },

        Django: {
            badgeURL:
                'https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white',
            siteURL: '',
        },

        'Express.js': {
            badgeURL:
                'https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB',
            siteURL: '',
        },

        JQuery: {
            badgeURL:
                'https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white',
            siteURL: '',
        },

        NPM: {
            badgeURL:
                'https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white',
            siteURL: '',
        },

        Next: {
            badgeURL:
                'https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white',
            siteURL: '',
        },

        'Node.js': {
            badgeURL:
                'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white',
            siteURL: '',
        },

        React: {
            badgeURL:
                'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB',
            siteURL: '',
        },

        Redux: {
            badgeURL:
                'https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white',
            siteURL: '',
        },

        Remix: {
            badgeURL:
                'https://img.shields.io/badge/remix-%23000.svg?style=for-the-badge&logo=remix&logoColor=white',
            siteURL: '',
        },

        SAAS: {
            badgeURL:
                'https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white',
            siteURL: '',
        },

        TailwindCSS: {
            badgeURL:
                'https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white',
            siteURL: '',
        },

        'Three.js': {
            badgeURL:
                'https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white',
            siteURL: '',
        },

        'Vue.js': {
            badgeURL:
                'https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D',
            siteURL: '',
        },

        Webpack: {
            badgeURL:
                'https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black',
            siteURL: '',
        },

        'Web3.js': {
            badgeURL:
                'https://img.shields.io/badge/web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white',
            siteURL: '',
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
        about: ``,
        prerequisites: ``,

        async init() {
            const init = await inquirer.prompt(initQuestions);

            const { repoAddress, sections } = init;
            this.repoPath = repoAddress;
            await this.getGitHubData(repoAddress);

            for (const section of sections) {
                await template[`create${section.split(' ').join('')}`]();
            }
        },

        async getGitHubData(repo) {
            const response = await fetch(
                `https://api.github.com/repos/${repo}`
            );
            const gitHubData = await response.json();
            const { name, html_url, language, license } = gitHubData;
            if (name) {
                this.projectName = name;
                this.githubURL = html_url;
                this.pulledLanguages = language;
                this.license = license.name;
                let formattedName = name.replace('-', ' ');
                formattedName = formattedName.replace('_', ' ');

                const promptChoices = [
                    'Yes',
                    `Yes, but format first (${formattedName})`,
                    'No, use a custom name',
                ];
                const response = await inquirer.prompt([
                    {
                        type: 'list',
                        message: `We have located your project on GitHub with the name of: ${name}
                        Would you like to make this your project name?`,
                        name: 'confirmProjectName',
                        choices: promptChoices,
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
            }
        },

        async createAbout() {
            console.log(
                '\nLet\'s create your "ABOUT" section!\nWe will ask you a few questions, you just provide the answers.\nIf you do not wish to answer, press "ENTER".\n'
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
            motivation ? (template.about += `${motivation}\n\n`) : null;
            why ? (template.about += `${why}\n\n`) : null;
            problem ? (template.about += `${problem}\n\n`) : null;
            learn ? (template.about += `${learn}\n\n`) : null;

            template.about = `
            ## About The Project

            ${
                motivation
                    ? `What was the motivation behind creating this project?\n\n${motivation}`
                    : null
            }
            ${why ? `Why was the project built?\n\n${why}` : null}
            ${
                problem
                    ? `What problem does this project solve?\n\n${problem}`
                    : null
            }
            ${
                learn
                    ? `What was learned through making this project?\n\n${learn}`
                    : null
            }


            `;
        },

        async createBuiltWith() {
            const response = await fetch(
                `https://api.github.com/repos/${this.repoPath}/languages`
            );

            const detectedLanguages = await response.json();
            const defaultLanguages = [...Object.keys(detectedLanguages)];

            const badgesUsed = await inquirer.prompt([
                {
                    type: 'checkbox',
                    message: 'Select the languages used for this project:',
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
            template.prerequisites = `## Prerequisites
            
            Below is the software required to run this program and the steps to install them:

            `;
            const steps = await this.addStep('prerequisite');
            for (const stepEntry of steps) {
                const { stepNumber, step, stepTitle, textStyle } = stepEntry;
                this.prerequisites += `- ${stepNumber}${stepTitle}
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
                this.installation += `- ${stepNumber}${stepTitle}
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
                this.usage += `- ${stepNumber}${stepTitle}
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
                this.roadmap += `- [ ] ${stepTitle} -> ${step}`;
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
            5. Open a Pull Request
            
            <p align="right">(<a href="#readme-top">back to top</a>)</p>`;

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
            console.log('License Created');
        },

        async createContact() {
            console.log('Contact created');
        },

        async createAcknowledgements() {
            console.log('Acknowledgements created');
        },

        addBadge(badges, badgeType) {
            for (const badge of badges) {
                template.referenceLinks += `[${badge}-badge]: ${badgeType[badge].badgeURL}\n[${badge}-url]: ${badgeType[badge].siteURL}\n`;
                template.builtWithBadges += `\n- [![${badge}][${badge}-badge]][${badge}-url]`;
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
    };

    /* await template.init();
    console.log(template); */

    console.log('%cHello', 'color: green; background: yellow; font-size: 30px');
})();

// Ask for github repo
// use repo link to create badges for: project name, contributors, forks, stars, issues, and license

// ask for brief description of project
// ask for the relative path to project logo (if it exists)

// ABOUT PROJECT
//
// User selects desired fields to include, including:
//
// - Motivation:
// - Why was the project built?
// - What problem does it solve?
// - What was learned?
// - What is unique about the project?
// - Challenges faced
// - Future development
//
// A loop runs through each selected field and asks the user to explain in further detail.

// User is prompted to answer whether they need to include an installation section (Y/N)
//
// If yes, the user is prompted to enter each step for the installation. A loop runs to append template guide with a new step until the user enters an empty string.

// User is asked whether they need a usage guide? (Y/N)
//
// Loop runs to create usage guide. Pressing 'enter' with text creates a double space. Pressing 'enter' without text moves on.
