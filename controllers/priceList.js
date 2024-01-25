const { MongoClient, ObjectId } = require("mongodb");

const URI = process.env.MONGODB_URI;

const priceList = async (req, res) => {
  try {
    const { clubId, start_time, end_time } = req.query;
    // Check if required parameters are present in the URL
    // if (!clubId || !start_time || !end_time) {
    //   return res.status(400).send("Bad Request: Missing parameters");
    // }

    const client = new MongoClient(URI);

    await client.connect();

    // Access the collection directly, as the URI already includes the database name
    const collection = client.db().collection("club_price_lists");

    // Find the club by the given clubId
    const clubs = await collection
      .find({ _id: new ObjectId(clubId) })
      .toArray();
    // Check if the club is found
    if (!clubs) {
      console.log("node => not found club");

      return res.status(404).send("Club not found");
    }

    res.status(200).json({ message: "Club found successfully", clubs });
  } catch (error) {
    // res.status(500).send("internal server error");
    next(error);
  }
};

module.exports = { priceList };
