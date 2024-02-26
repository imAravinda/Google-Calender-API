import {authenticate} from '@google-cloud/local-auth';
import {google} from 'googleapis';


const CLIENT_ID = '276709763129-700muaqshm4g8bl9v1djagdu486emom2.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback'; // Update with your redirect URI
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

export const getBusyIntervals = async (req, res) => {
  try {
    const auth = await authenticate({
      scopes: SCOPES,
      keyfilePath: 'D:/New folder/Assignment/Q2/credentials.json'
    });
    oauth2Client.setCredentials({
      refresh_token: auth.credentials.refresh_token
    });
    const calendar = google.calendar({version: 'v3', auth:oauth2Client});
    const response = await calendar.events.list({
      calendarId:req.body.calendarId,
      timeMin: req.body.startDate + 'T00:00:00Z',
        timeMax: req.body.endDate + 'T23:59:59Z',
    });
    console.log(response);
    if (response.data && response.data.items ) {
      const busyIntervals = response.data.items;
      const array = [];
      busyIntervals.map((event,i)=>{
        array.push(event.summary);
      })
      return res.status(200).json({
        status: 'SUCCESS',
        message: 'Details of busy intervals',
        data: {
          array
        }
      });
    } else {
      throw new Error('Invalid response structure from Google Calendar API');
    }
  } catch (error) {
    return res.status(500).json({
      status: 'SERVER ERROR',
      message: error.message
    });
  }
};
