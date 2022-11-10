'use strict';

const fs = require('fs');
const inquirer = require('inquirer');

const initQuestions = [
    {
        type: 'input',
        message: 'Enter the URL for your GitHub Repo:\nhttps://www.github.com/',
        name: 'githubURL'
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
        default: ['About', 'Installation', 'Usage', 'Roadmap', 'License', 'Contact']
    }
]

//TODO: add more badges to this list from the internet. Add link to badge.
const badges = {
    html: 'html',
    css: 'css',
    javascript: 'javascript'
}

const camelCase = function (string) {
    const [first, ...rest] = string.toLowerCase().split(' ');
    return [first, rest.map(element => {
        const [first, ...rest] = element.split('');
        return [first.toUpperCase(), ...rest].join('');
    }).join('')].join('');
}

const template = {
    currentSectionIndex: 0,
    sectionList: [],
    activeBadges: [],
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
        })
    },

    async createAbout() {
        console.log('\nLet\'s create your "ABOUT" section!\nWe will ask you a few questions, you just provide the answers.\nIf you do not wish to answer, press "ENTER".');
        await inquirer.prompt([
            {
                type: 'input',
                message: 'What was the motivation behind building template project?',
                name: 'motivation'
            },
            {
                type: 'input',
                message: 'Why did you build template project?',
                name: 'why'
            },
            {
                type: 'input',
                message: 'What problem does it solve?',
                name: 'problem'
            },
            {
                type: 'input',
                message: 'What did you learn?',
                name: 'learn'
            }
        ]).then((res) => {
            const {motivation, why, problem, learn} = res;
            motivation ? template.about += `${motivation}\n\n` : null;
            why ? template.about += `${why}\n\n` : null;
            problem ? template.about += `${problem}\n\n` : null;
            learn ? template.about += `${learn}\n\n` : null;
        })
    },

    async createBuiltWith() {
        await inquirer.prompt([
            {
                type: 'checkbox',
                message: '\nSelect any technologies/frameworks you used to build this application:\n',
                name: 'badges',
                choices: ['html', 'css', 'javascript']
            }
        ]).then(res => {
            for (const badge of res.badges) {
                template.activeBadges.push(badges[badge]);
            }
            console.log(template.activeBadges);
        })
    }
}

const addSections = async function () {
    if (template.currentSectionIndex < template.sectionList.length) {
        await template.sectionList[template.currentSectionIndex](); // template object -> list of sections -> specific section function in list
        template.currentSectionIndex ++;
        addSections();
    } else {
        return
    }
}

template.init().then(addSections);

// template.init().then(template.createAbout);

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




