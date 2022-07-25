const baseURL = "https://digitaltabler.pg.com:8088";
const days = [];
const server = 'tsp-appserverpe.na.pg.com';
import Swal from 'sweetalert2';
for (let i = 1; i < 32; i++) {
  const day = { id: i, value: i.toString(), name: i.toString() };
  days.push(day);
}
export default {
  log: (e) => {
    console.log(e);
  },
  // API Functions
  getGraphUser: async (val, accessToken, top = 9) => {
    return await fetch(`https://graph.microsoft.com/v1.0/me/people?$search=%22${val}%22&$top=${top}&$filter=personType/class%20eq%20%27Person%27`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      }
    ).then((req) =>
      req.json()
    );
  },
  getGraphUserProfile: async (accessToken) => {
    return await fetch(`https://graph.microsoft.com/v1.0/me/`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      }
    ).then((req) =>
      req.json()
    );
  },
  // API Functions
  getSharePointListItems: async (site, accessToken, list, top = 4999, args = "") => {
    return await fetch(`https://graph.microsoft.com/v1.0/sites/${site}/lists/${list}/items?expand=fields&$top=${top}${args}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      }
    ).then((req) =>
      req.json()
    );
  },
  postSharePointListItem: async (site, accessToken, list, data) => {
    return await fetch(`https://graph.microsoft.com/v1.0/sites/${site}/lists/${list}/items/`,
      {
        body:JSON.stringify(data),
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken, 'Content-Type': 'application/json' },
      }
    ).then((req) =>
      req.json()
    );
  },
  patchSharePointListItem: async (site, accessToken, list, id, data) => {
    return await fetch(`https://graph.microsoft.com/v1.0/sites/${site}/lists/${list}/items/${id}`,
      {
        body:JSON.stringify(data),
        method: "PATCH",
        headers: { Authorization: "Bearer " + accessToken, 'Content-Type': 'application/json' },
      }
    ).then((req) =>
      req.json()
    );
  },
  searchUsers: async (email) => {
    return await fetch(`${baseURL}/api/users/?email=${email}`).then((req) =>
      req.json()
    );
  },
  getUserDocsProfile: async (username) => {
    try {
      return await fetch(`https://${server}/APIs/MicrosoftDocs/profiles.php?username=${username}`).then((req) =>
        req.json()
      );
    } catch {
      return await fetch(`https://${server}/APIs/MicrosoftDocs/profiles.php?username=${username}`).then((req) =>
        req.text()
      );
    }
  },
  getUserDocsGameStatus: async (userId) => {
    return await fetch(`https://${server}/APIs/MicrosoftDocs/gamestatus.php?id=${userId}`).then((req) =>
      req.json()
    );
  },
  getAchievementLookup: async (uids) => {
    return await fetch(`https://${server}/APIs/MicrosoftDocs/achievementLookup.php?uids=${uids}`).then((req) =>
      req.json()
    ).catch(e=>{
      Swal.fire({
            title: 'Oh Snap! Achievement Lookup Error',
            text: e,
            icon: 'error',
            confirmButtonText: 'Alright'
          });
    });
  },
  createUser: async ({ first_name, last_name, email, user_id, plant }) => {
    return await fetch(`${baseURL}/api/users/`, {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        user_id,
        plant,
      }),
      method: "POST"
    }).then((req) =>
      req.json()
    );
  },
  getPendingStatus: async () => {
    return await fetch(
      `${baseURL}/api/status/?no_page=true&depth=0&name=Pending`
    ).then((req) => req.json());
  },
  getApproversByUserId: async (id) => {
    return await fetch(
      `${baseURL}/api/approvers/?no_page=true&depth=0&user=${id}`
    ).then((req) => req.json());
  },
  getBusinessByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/businesses/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getTypeByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/types/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getReasonByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/reasons/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getQuestionsByPlantId: async (id) => {
    return await fetch(`${baseURL}/api/questions/?plant=${id}`).then((req) =>
      req.json()
    );
  },
  getModuleByBusinessIds: async (ids) => {
    return await fetch(`${baseURL}/api/modules/?businesses__in=${ids}`).then(
      (req) => req.json()
    );
  },
  getApproverByBusinessIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&business__in=${ids}`
    ).then((req) => req.json());
  },
  getDepartmentByModuleIds: async (ids) => {
    return await fetch(`${baseURL}/api/departments/?module__in=${ids}`).then(
      (req) => req.json()
    );
  },
  getAreaByDepartmentIds: async (ids) => {
    return await fetch(`${baseURL}/api/areas/?department__in=${ids}`).then(
      (req) => req.json()
    );
  },
  getApproversByBusinessIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&business__in=${ids}`
    ).then((req) => req.json());
  },
  getApproversByModuleIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&module__in=${ids}`
    ).then((req) => req.json());
  },
  getApproversByDepartmentIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&department__in=${ids}`
    ).then((req) => req.json());
  },
  getApproversByAreaIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&area__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByBusinessIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&business__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByModuleIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&module__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByDepartmentIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&department__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByAreaIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&area__in=${ids}`
    ).then((req) => req.json());
  },
  getApproversByTypeIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&types__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByTypeIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&types__in=${ids}`
    ).then((req) => req.json());
  },
  getApproversByReasonIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/approvers/?depth=1&reasons__in=${ids}`
    ).then((req) => req.json());
  },
  getContributorsByReasonIds: async (ids) => {
    return await fetch(
      `${baseURL}/api/contributors/?depth=1&reasons__in=${ids}`
    ).then((req) => req.json());
  },

  // Standard Functions
  calRepeat: (values, weekdaysSelected) => {
    const moment = window.moment;
    let recurrenceRule = {
      FREQ: "",
      BYDAY: "",
      COUNT: "",
      UNTIL: "",
      INTERVAL: "",
      BYMONTHDAY: "",
      BYMONTH: "",
    };
    if (values.repeat === false) return;
    let key = values.repeatFreq.value;
    let string = `FREQ=${key}`;
    recurrenceRule.FREQ = key;
    switch (key) {
      case "HOURLY":
        if (values.interval > 1) {
          string += `;INTERVAL=${values.interval}`;
          recurrenceRule.INTERVAL = values.interval;
        }
        if (values.endRepeat === "On") {
          string += `;UNTIL=${moment(values.endDate).format(
            "YYYYMMDDTHHmmss"
          )}Z`;
          recurrenceRule.UNTIL =
            moment(values.endDate).format("YYYYMMDDTHHmmss") + "Z";
        }
        if (values.endRepeat === "After") {
          string += `;COUNT=${values.endAfter}`;
          recurrenceRule.COUNT = values.endAfter;
        }
        break;
      case "DAILY":
        if (values.interval > 1) {
          string += `;INTERVAL=${values.interval}`;
          recurrenceRule.INTERVAL = values.interval;
        }
        if (values.endRepeat === "On") {
          string += `;UNTIL=${moment(values.endDate).format(
            "YYYYMMDDTHHmmss"
          )}Z`;
          recurrenceRule.UNTIL =
            moment(values.endDate).format("YYYYMMDDTHHmmss") + "Z";
        }
        if (values.endRepeat === "After") {
          string += `;COUNT=${values.endAfter}`;
          recurrenceRule.COUNT = values.endAfter;
        }
        break;
      case "WEEKLY":
        if (values.interval > 1) {
          string += `;INTERVAL=${values.interval}`;
          recurrenceRule.INTERVAL = values.interval;
        }
        if (values.weekdaysSelected.length > 0) {
          let arr = [];
          for (let i = 0; i < weekdaysSelected.length; i++) {
            arr.push(weekdaysSelected[i]);
          }
          string += `;BYDAY=${arr.join(",")}`;
          recurrenceRule.BYDAY = arr.join(",");
        }
        if (values.endRepeat === "On") {
          string += `;UNTIL=${moment(values.endDate).format(
            "YYYYMMDDTHHmmss"
          )}Z`;
          recurrenceRule.UNTIL =
            moment(values.endDate).format("YYYYMMDDTHHmmss") + "Z";
        }
        if (values.endRepeat === "After") {
          string += `;COUNT=${values.endAfter}`;
          recurrenceRule.COUNT = values.endAfter;
        }
        break;
      case "MONTHLY":
        if (values.interval > 1) {
          string += `;INTERVAL=${values.interval}`;
          recurrenceRule.INTERVAL = values.interval;
        }
        if (values.endRepeat === "On") {
          string += `;UNTIL=${moment(values.endDate).format(
            "YYYYMMDDTHHmmss"
          )}Z`;
          recurrenceRule.UNTIL =
            moment(values.endDate).format("YYYYMMDDTHHmmss") + "Z";
        }
        if (values.endRepeat === "After") {
          string += `;COUNT=${values.endAfter}`;
          recurrenceRule.COUNT = values.endAfter;
        }
        break;
      case "YEARLY":
        if (values.interval > 1) {
          string += `;INTERVAL=${values.interval}`;
          recurrenceRule.INTERVAL = values.interval;
        }
        if (values.endDate) {
          string += `;BYMONTHDAY=${values.endDay.id};BYMONTH=${values.monthSelected.id}`;
          recurrenceRule.BYMONTHDAY = values.endDay.id;
          recurrenceRule.BYMONTH = values.monthSelected.id;
        }
        if (values.endRepeat === "On") {
          string += `;UNTIL=${moment(values.endDate).format(
            "YYYYMMDDTHHmmss"
          )}Z`;
          recurrenceRule.UNTIL =
            moment(values.endDate).format("YYYYMMDDTHHmmss") + "Z";
        }
        if (values.endRepeat === "After") {
          string += `;COUNT=${values.endAfter}`;
          recurrenceRule.COUNT = values.endAfter;
        }
        break;
    }
    return string;
  },
  frequencies: [
    { id: 0, value: "HOURLY", name: "Hourly" },
    { id: 1, value: "DAILY", name: "Daily" },
    { id: 2, value: "WEEKLY", name: "Weekly" },
    { id: 3, value: "MONTHLY", name: "Monthly" },
    { id: 4, value: "YEARLY", name: "Yearly" },
  ],
  months: [
    { id: 1, value: "1", name: "January" },
    { id: 2, value: "2", name: "February" },
    { id: 3, value: "3", name: "March" },
    { id: 4, value: "4", name: "April" },
    { id: 5, value: "5", name: "May" },
    { id: 6, value: "6", name: "June" },
    { id: 7, value: "7", name: "July" },
    { id: 8, value: "8", name: "August" },
    { id: 9, value: "9", name: "September" },
    { id: 10, value: "10", name: "October" },
    { id: 11, value: "11", name: "November" },
    { id: 12, value: "12", name: "December" },
  ],
  weekdays: [
    { i: 0, id: "SU", name: "Sun" },
    { i: 1, id: "MO", name: "Mon" },
    { i: 2, id: "TU", name: "Tue" },
    { i: 3, id: "WE", name: "Wed" },
    { i: 4, id: "TH", name: "Thu" },
    { i: 5, id: "FR", name: "Fri" },
    { i: 6, id: "SA", name: "Sat" },
  ],
  days,
  getAccessToken: () => {
    let key;
    for (let index = 0; index < localStorage.length; index++) {
      const element = Object.keys(localStorage)[index];
      if (element.includes('accesstoken')) {
        key = element;
      }
    }
    let accessToken = JSON.parse(localStorage.getItem(key)).secret;
    return accessToken;
  }
};

