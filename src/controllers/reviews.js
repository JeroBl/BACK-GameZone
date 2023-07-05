const moment = require('moment');
const transporter = require('../middlewares/nodemailer')
const { Users, Reviews, Games } = require('../db');
const createReview = async (req, res) => {
  try {
    //se debe de recibir el id del usuario para hacer la relacion con la review
    const { review, rating, id, name } = req.body;
    if (!review || !rating ) res.status(400).json({ message: "campos incompletos" })

    const user = await Users.findByPk(id)
    const game = await Games.findOne({ where : { name: name } })

    const createReview = await Reviews.create({ 
        reviews: review,
        rating: rating,
        date: moment().format('DD/ MM/ YYYY') 
      });

    await createReview.addUsers(user)
    await createReview.addGames(game);

    await transporter.sendMail({
      from: '"New User Comment Notification" <carrizosamayito@gmail.com>', // sender address
      to: `carrizosamayito@gmail.com`, // list of receivers
      subject: "New User Comment Notification", // Subject line
      html:  `<h1>New User Comment Notification</h1>
              <p>Dear Admin,</p>
              <p>A new comment has been posted by a user regarding a game in our platform.</p>
              <p><strong>Game:</strong> ${name}</p>
              <p><strong>Comment:</strong> ${review}</p>
              <p>Please review the comment and take appropriate action, if necessary. You can access the game's page and the comment section in the admin dashboard.</p>
              <p>Thank you for your attention to this matter.</p>
              <p>Best regards,</p>
              <p>The Gamezone Team</p>`
      }
  )

      res.status(200).send('Review Creada')
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

const updateReview = async (req, res) => {
  try {
    
  
    const { review, rating, id } = req.body

    await Reviews.update(
      {
        reviews: review,
        rating: rating,
        date: moment().format('DD/ MM/ YYYY')
      }, 
      { where:{ id } }
    )

    res.status(200).send('Updated Review')

  } catch (error) {
    res.status(400).send({error: error.message})
  }
}

const deleteReview = async (req, res) =>{

  try {
   const { id } = req.params

   await Reviews.destroy({ where: 
     { id: id }
   })

   res.status(200).json('Deleted review')

  } catch (error) {
   res.status(404).send(error.message)
  }
}




  module.exports = {
    createReview,
    updateReview,
    deleteReview
};