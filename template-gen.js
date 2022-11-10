'use strict';

const fs = require('fs');
const inquirer = require('inquirer');

const initQuestions = [
    {
        type: 'input',
        message: 'Enter the URL for your GitHub Repo:\nhttps://www.github.com/',
        name: 'githubURL',
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

        HTML5: {
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

/* const camelCase = function (string) {
    const [first, ...rest] = string.toLowerCase().split(' ');
    return [
        first,
        rest
            .map((element) => {
                const [first, ...rest] = element.split('');
                return [first.toUpperCase(), ...rest].join('');
            })
            .join(''),
    ].join('');
};

const template = {
    currentSectionIndex: 0,
    sectionList: [],
    referenceLinks: ``,
    builtWithBadges: ``,

    async init() {
        await inquirer.prompt(initQuestions).then(function (res) {
            template.githubURL = `https://www.github.com/${res.githubURL}`;
            for (const section of res.sections) {
                template[section] = ``;
                console.log(section);
                if (section === 'About') {
                    template.sectionList.push(template.createAbout);
                } else if (section === 'Built With') {
                    template.sectionList.push(template.createBuiltWith);
                }
                // } else if (section === 'Prerequisites') {
                //     template.sectionList.push(template.createPrerequisites);
                // } else if (section === 'Installation') {
                //     template.sectionList.push(template.createInstallation);
                // } else if (section === 'Usage') {
                //     template.sectionList.push(template.createUsage);
                // } else if (section === 'Roadmap') {
                //     template.sectionList.push(template.createRoadmap);
                // } else if (section === 'Contributing') {
                //     template.sectionList.push(template.createContributing);
                // } else if (section === 'License') {
                //     template.sectionList.push(template.createLicense);
                // } else if (section === 'Contact') {
                //     template.sectionList.push(template.createContact);
                // } else if (section === 'Acknowledgements') {
                //     template.sectionList.push(template.createAcknowledgements);
                // }
            }
            console.log(template.sectionList);
        });
    },

    async createAbout() {
        console.log(
            '\nLet\'s create your "ABOUT" section!\nWe will ask you a few questions, you just provide the answers.\nIf you do not wish to answer, press "ENTER".'
        );
        await inquirer
            .prompt([
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
            ])
            .then((res) => {
                const { motivation, why, problem, learn } = res;
                motivation ? (template.about += `${motivation}\n\n`) : null;
                why ? (template.about += `${why}\n\n`) : null;
                problem ? (template.about += `${problem}\n\n`) : null;
                learn ? (template.about += `${learn}\n\n`) : null;
            });
    },

    async createBuiltWith() {
        await inquirer
            .prompt([
                {
                    type: 'checkbox',
                    message:
                        '\nSelect any technologies/frameworks you used to build this application:\n',
                    name: 'languages',
                    choices: [...Object.keys(badges.languages)],
                    default: ['JavaScript'],
                },
            ])
            .then((res) => {
                template.addBadge(res.languages, badges.languages);
            })
            .then(async function () {
                await inquirer
                    .prompt([
                        {
                            type: 'checkbox',
                            message: 'What frameworks did you use?',
                            name: 'frameworks',
                            choices: [...Object.keys(badges.frameworks)],
                        },
                    ])
                    .then((res) => {
                        template.addBadge(res.frameworks, badges.frameworks);
                    });
            }); // more prompts can be added here following the same formula to add additional badges / badge types.
    },

    addBadge(badges, badgeType) {
        for (const badge of badges) {
            template.referenceLinks += `[${badge}-badge]: ${badgeType[badge].badgeURL}\n[${badge}-url]: ${badgeType[badge].siteURL}\n`;
            template.builtWithBadges += `[![${badge}][${badge}-badge]][${badge}-url]\n`;
        }
    },
};

const addSections = async function () {
    if (template.currentSectionIndex < template.sectionList.length) {
        await template.sectionList[template.currentSectionIndex](); // template object -> list of sections -> specific section function in list
        template.currentSectionIndex++;
        addSections();
    } else {
        return;
    }
}; */

(async function () {
    const template = {
        sectionList: [],
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
        },

        async createBuiltWith() {
            console.log('Built with section created');
        },

        async createPrerequisites() {
            console.log('Prerequisites created');
        },

        async createInstallation() {
            console.log('Installation Created');
        },

        async createUsage() {
            console.log('Usage created');
        },

        async createRoadmap() {
            console.log('Roadmap created');
        },

        async createContributing() {
            console.log('Contributing Created');
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
    };

    const populateSectionList = function (section) {
        section === 'About'
            ? template.sectionList.push(template.createAbout)
            : null;
    };

    const response = await inquirer.prompt(initQuestions);

    const { githubURL, sections } = response;

    template.githubURL = githubURL;

    for (const section of sections) {
        template[section] = ``;
        await template[`create${section.split(' ').join('')}`]();
    }
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
