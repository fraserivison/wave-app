import { rest } from "msw";

const baseURL = "https://wave-drf-api-1157a4fa181b.herokuapp.com";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 2,
        owner: "Fraser",
        created_at: "22 Jan 2025",
        updated_at: "22 Jan 2025",
        dj_name: "",
        bio: "",
        image:
          "https://res.cloudinary.com/dmylma7bf/image/upload/v1/media/../default_profile_bp5fwp",
        is_owner: true,
        following_id: null,
        events: [],
        tracks: [],
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
