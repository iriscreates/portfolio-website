import type { Metadata } from 'next';
import { DesignCaseStudyPage, type DesignCaseStudyData } from '../components/design-case-study-page';

export const metadata: Metadata = { title: 'Rishtey — Iris Yu' };
export const dynamic = 'force-static';

const rishteyCalendarCells: Array<number | null> = [
  null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
];
const rishteyVisitDays = [3, 5, 7, 10, 14, 17, 24];

const rishtey: DesignCaseStudyData = {
  title: 'Rishtey',
  description: 'A family network for sharing dementia caregiving',
  heroImage: '/rishtey-concept.svg',
  heroAlt: 'Rishtey concept showing a shared family calendar and a simple contact flow.',
  prototypeUrl: 'https://www.figma.com/make/2ENOZ57dkDpiDyq7UCsHyK/Rishtey-app-wireframe',
  category: 'School project',
  role: 'Product designer',
  deliverables: 'Wall calendar and companion app',
  footerLabel: 'School project',
  overview: (
    <>
      <p>Rishtey pairs a companion app with a tactile shared calendar to help family caregivers coordinate visits and ask their network for practical support.</p>
      <p>It makes requests easier for relatives to respond to while helping a person in the early stages of dementia stay connected with loved ones and know who is coming.</p>
    </>
  ),
  problem: (
    <p>Caregiving can leave one family member carrying most of the coordination and feeling uncomfortable asking others to help. Friends and relatives may want to contribute but need clear, considerate ways to choose a time or offer support. Rishtey aims to make those requests easier to schedule and respond to, while keeping the person with dementia informed and involved.</p>
  ),
  goals: [
    'Make offers feel relational, specific, and easy to accept or decline.',
    'Give caregivers three ways to coordinate help: visitor self-booking, direct invitations, and device-initiated nudges.',
    'Give the resident parent control over quiet periods, incoming visits, and the contact list.',
    'Keep the contact flow simple with a large button, familiar faces, and persistent prompts.',
  ],
  solution: {
    copy: (
      <>
        <p>The companion app is the caregiver’s main tool for coordinating support. They can schedule visits, invite people in their network to choose an open time, or send gentle prompts when help is needed. A tactile shared calendar makes plans visible at home, helping the person in the early stages of dementia know who is coming and take part in time together.</p>
        <div className="rishtey-flow-grid" aria-label="Three ways commitments reach the calendar">
          <article>
            <span>01 · Visitor-led</span>
            <h3>Self-booking</h3>
            <p>Visitors see open dates as opportunities, choose how they would like to help, and preview what the household will see.</p>
          </article>
          <article>
            <span>02 · Caregiver-coordinated</span>
            <h3>Coordinate</h3>
            <p>The caregiver can invite a relative to a specific visit or task, turning a broad need into a clear, manageable request.</p>
          </article>
          <article>
            <span>03 · Device-initiated</span>
            <h3>Warm nudges</h3>
            <p>When the calendar has a gap, the app can offer a gentle prompt to someone in the network, with per-person cooldowns to avoid repeated pressure.</p>
          </article>
        </div>
        <section className="rishtey-prototype-walkthrough" aria-labelledby="rishtey-prototype-heading">
          <div className="rishtey-prototype-intro">
            <span>Prototype walkthrough</span>
            <h3 id="rishtey-prototype-heading">How Rishtey shares the social load</h3>
            <p>These screens show the caregiver’s path from spotting a gap to inviting help, while keeping the person at home included in the plan.</p>
          </div>

          <article className="rishtey-prototype-story">
            <div className="rishtey-prototype-visual" aria-hidden="true">
              <div className="rishtey-admin-mockup">
                <div className="rishtey-mockup-header">
                  <span className="rishtey-mockup-mark">♡</span>
                  <span><strong>Rishtey Admin</strong><small>Coordinating for Meera &amp; Sanjay</small></span>
                </div>
                <div className="rishtey-mockup-stats">
                  <span><small>This week</small><strong>5 visits</strong></span>
                  <span><small>Gaps ahead</small><strong>8 days</strong></span>
                  <span><small>Your visits</small><strong>2 / month</strong></span>
                </div>
                <div className="rishtey-mockup-calendar">
                  <strong>April 2026</strong>
                  <div className="rishtey-mini-calendar">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span className="rishtey-mini-calendar-weekday" key={`${day}-${index}`}>{day}</span>)}
                    {rishteyCalendarCells.map((day, index) => (
                      <span className={[
                        'rishtey-mini-calendar-day',
                        day === null ? 'rishtey-mini-calendar-day--empty' : '',
                        day !== null && [21, 22, 23, 25, 26, 27, 28].includes(day) ? 'rishtey-mini-calendar-day--gap' : '',
                        day === 20 ? 'rishtey-mini-calendar-day--today' : '',
                      ].filter(Boolean).join(' ')} key={`day-${index}`}>
                        {day}
                        {day !== null && rishteyVisitDays.includes(day) && <i />}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rishtey-mockup-gap">
                  <span>Gap analysis <strong>2 gaps ahead</strong></span>
                  <div><strong>Fri 25 – Mon 28</strong><small>4 consecutive days with no visits</small></div>
                  <b>Send nudges to fill this gap ↗</b>
                </div>
              </div>
            </div>
            <div className="rishtey-prototype-copy">
              <span>01 · Caregiver dashboard</span>
              <h4>Make the gap visible before asking for help.</h4>
              <p>The calendar and gap analysis turn a vague feeling that “more help is needed” into a clear stretch of time. The caregiver can choose a specific invitation instead of carrying every follow-up themselves.</p>
            </div>
          </article>

          <article className="rishtey-prototype-story rishtey-prototype-story--reverse">
            <div className="rishtey-prototype-visual" aria-hidden="true">
              <div className="rishtey-nudge-mockup">
                <div className="rishtey-nudge-heading"><strong>Send nudges</strong><small>Fill the gap: Fri 25 – Mon 28</small></div>
                <div className="rishtey-nudge-recommendation"><strong>System recommendation</strong><p>Based on visit patterns, invite three people with a warm message—not a request.</p></div>
                <span className="rishtey-nudge-list-label">Who will receive nudges</span>
                <div className="rishtey-nudge-recipient"><i>S</i><span><strong>Satyam <em>Priority</em></strong><small>Last visit: 28 days ago · Longest gap</small></span></div>
                <div className="rishtey-nudge-recipient"><i>A</i><span><strong>Arun</strong><small>Last visit: 15 days ago</small></span></div>
                <div className="rishtey-nudge-recipient"><i>P&amp;M</i><span><strong>Pete &amp; Mary</strong><small>Last visit: 20 days ago</small></span></div>
                <div className="rishtey-nudge-message"><span>Example message</span><p>“Meera has been asking about you. It’s been a while — would you want to drop by for chai this weekend?”</p></div>
                <div className="rishtey-nudge-privacy">Your coordination stays private. The system handles the social weight.</div>
              </div>
            </div>
            <div className="rishtey-prototype-copy">
              <span>02 · Considerate nudges</span>
              <h4>Make the invitation warm, specific, and low-pressure.</h4>
              <p>The prototype suggests a small group based on visit patterns, then shows who will be contacted and the message they’ll receive. Framing the note as a personal invitation keeps the caregiver’s coordination private and makes the next step easy to accept or decline.</p>
            </div>
          </article>

          <article className="rishtey-prototype-story">
            <div className="rishtey-prototype-visual" aria-hidden="true">
              <div className="rishtey-home-mockup">
                <span className="rishtey-home-mockup-label">At home · Wall calendar</span>
                <div className="rishtey-home-connect-button"><strong>Connect with someone</strong><small>Press to reach family and friends</small></div>
                <div className="rishtey-home-flow">
                  <span><b>1</b> Choose a familiar person</span>
                  <span><b>2</b> Choose a visit, message, or call</span>
                </div>
                <div className="rishtey-home-contacts"><i>S</i><span>Sonia</span><i>A</i><span>Anjuli</span><i>A</i><span>Ajay</span></div>
              </div>
            </div>
            <div className="rishtey-prototype-copy">
              <span>03 · At-home participation</span>
              <h4>Keep connection in reach without giving the person another coordination job.</h4>
              <p>The wall-calendar view pairs a large starting action with familiar people and a few clear ways to connect. It keeps the person living with dementia involved, while the companion app carries the caregiver’s scheduling work.</p>
            </div>
          </article>
        </section>
      </>
    ),
  },
};

export default function RishteyCaseStudy() {
  return <DesignCaseStudyPage caseStudy={rishtey} />;
}
