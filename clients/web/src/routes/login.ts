export async function post(req, res) {
  try {
    const { token } = req.body;

    req.session.token = token;
    res.end(JSON.stringify({ token }));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}
