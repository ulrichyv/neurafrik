const fs = require('fs');
const path = require('path');

const SUBMISSIONS_FILE = path.join(__dirname, '..', 'data', 'submissions.json');
const SUBSCRIBERS_FILE = path.join(__dirname, '..', 'data', 'subscribers.json');
const EVENTS_FILE = path.join(__dirname, '..', 'data', 'events.json');
const SOLUTIONS_FILE = path.join(__dirname, '..', 'data', 'solutions.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Initialize files if they don't exist
if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(EVENTS_FILE)) {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(SOLUTIONS_FILE)) {
    fs.writeFileSync(SOLUTIONS_FILE, JSON.stringify([]));
}

const db = {
    getSubmissions: () => {
        try {
            const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading submissions:', error);
            return [];
        }
    },
    saveSubmission: (submission) => {
        try {
            const submissions = db.getSubmissions();
            submission.id = submissions.length > 0 ? submissions[submissions.length - 1].id + 1 : 1;
            submission.timestamp = new Date().toISOString();
            submissions.push(submission);
            fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
            return submission;
        } catch (error) {
            console.error('Error saving submission:', error);
            return null;
        }
    },
    deleteSubmission: (id) => {
        try {
            const submissions = db.getSubmissions();
            const filtered = submissions.filter(s => s.id !== parseInt(id));
            fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(filtered, null, 2));
            return true;
        } catch (error) {
            console.error('Error deleting submission:', error);
            return false;
        }
    },
    getSubscribers: () => {
        try {
            const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading subscribers:', error);
            return [];
        }
    },
    addSubscriber: (email) => {
        try {
            const subscribers = db.getSubscribers();
            if (!subscribers.find(s => s.email === email)) {
                subscribers.push({
                    email,
                    timestamp: new Date().toISOString()
                });
                fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
            }
            return true;
        } catch (error) {
            console.error('Error adding subscriber:', error);
            return false;
        }
    },
    deleteSubscriber: (email) => {
        try {
            const subscribers = db.getSubscribers();
            const filtered = subscribers.filter(s => s.email !== email);
            fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(filtered, null, 2));
            return true;
        } catch (error) {
            console.error('Error deleting subscriber:', error);
            return false;
        }
    },
    getEvents: () => {
        try {
            const data = fs.readFileSync(EVENTS_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading events:', error);
            return [];
        }
    },
    saveEvent: (eventData) => {
        try {
            const events = db.getEvents();
            eventData.id = events.length > 0 ? events[events.length - 1].id + 1 : 1;
            eventData.createdAt = new Date().toISOString();
            events.push(eventData);
            fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
            return eventData;
        } catch (error) {
            console.error('Error saving event:', error);
            return null;
        }
    },
    deleteEvent: (id) => {
        try {
            const events = db.getEvents();
            const filtered = events.filter(e => e.id !== parseInt(id));
            fs.writeFileSync(EVENTS_FILE, JSON.stringify(filtered, null, 2));
            return true;
        } catch (error) {
            console.error('Error deleting event:', error);
            return false;
        }
    },
    getSolutions: () => {
        try {
            const data = fs.readFileSync(SOLUTIONS_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading solutions:', error);
            return [];
        }
    },
    saveSolution: (solutionData) => {
        try {
            const solutions = db.getSolutions();
            solutionData.id = solutions.length > 0 ? solutions[solutions.length - 1].id + 1 : 1;
            solutionData.createdAt = new Date().toISOString();
            solutions.push(solutionData);
            fs.writeFileSync(SOLUTIONS_FILE, JSON.stringify(solutions, null, 2));
            return solutionData;
        } catch (error) {
            console.error('Error saving solution:', error);
            return null;
        }
    },
    deleteSolution: (id) => {
        try {
            const solutions = db.getSolutions();
            const filtered = solutions.filter(s => s.id !== parseInt(id));
            fs.writeFileSync(SOLUTIONS_FILE, JSON.stringify(filtered, null, 2));
            return true;
        } catch (error) {
            console.error('Error deleting solution:', error);
            return false;
        }
    }
};

module.exports = db;
