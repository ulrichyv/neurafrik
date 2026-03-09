const fs = require('fs');
const path = require('path');

const SUBMISSIONS_FILE = path.join(__dirname, '..', 'data', 'submissions.json');
const SUBSCRIBERS_FILE = path.join(__dirname, '..', 'data', 'subscribers.json');

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
    }
};

module.exports = db;
