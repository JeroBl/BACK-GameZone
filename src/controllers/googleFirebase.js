const { Users } = require('../db');
const transporter = require('../middlewares/nodemailer')

const firebaseUser = async (req, res) => {
    try {
      const { name, email, profileImage, user_name } = req.body;
      if (!email || !user_name || !name ||!profileImage) {
  
        res.status(400).json({ message: "datos incompletos" })
      } else {
        const existingUser = await Users.findOne({
          where: {
            email: email
          }
        });
  
        if (existingUser) {
          //return res.status(400).json({ error: "El correo electrónico ya está registrado" });

            res.status(200).json(existingUser)

        }else{

            const createUserFirebase = await Users.create({
                name: name,
                email: email,
                profileImage: profileImage,
                user_name: user_name,
                role: "users",
                ban: false
            });

            await transporter.sendMail({
                from: '"Welcome to Our Platform" <djkmecdgm65@gmail.com>', // sender address
                to: `${email}`, // list of receivers
                subject: "Welcome to Our Platform", // Subject line
                html:  `<h1>Welcome to Gamezone</h1>
                        <p>Dear ${name},</p>
                        <p>Welcome to our platform! We are thrilled to have you as a new member of our community.</p>
                        <p>With our platform, you'll have access to a wide range of exciting features, games, and interactive experiences. Whether you're a casual player or a seasoned gamer, we have something for everyone.</p>
                        <p>We encourage you to explore our platform, discover new games and enjoy the immersive world of gaming.</p>
                        <p>If you have any questions, concerns, or need assistance, our support team is always ready to help. Feel free to reach out to us via mail at carrizosamayito@gmail.com</p>
                        <p>Thank you for joining us! We hope you have an incredible experience and make lasting memories on our platform.</p>
                        <p>Best regards,</p>
                        <p>The Gamezone Team</p>`
                }
            )
            res.status(200).json(createUserFirebase)
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
 };

module.exports = {
    firebaseUser
}