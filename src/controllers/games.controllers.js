// const { Games, Categories, Developers, Genres, Languages, Platforms, Publishers, Reviews } = require('../db');
// // Ruta para traer todos los Games creados (borrado lógico)
// const getAllGames = async (req, res) => {
//   try {
//     const games = await Games.findAll();
//     res.status(200).json(games);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
// //Ruta para buscar un Game por ID creado (borrado lógico)
// const getGame = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.query;

//     let game;
//     if (name) {
//       // Si se proporciona el parámetro de nombre, buscar por nombre
//       game = await Games.findOne({ where: { name } });
//     } else if (id) {
//       // Si se proporciona el parámetro de ID, buscar por ID
//       game = await Games.findByPk(id);
//     }

//     if (game) {
//       res.status(200).json(game);
//     } else {
//       res.status(404).json({ message: 'Juego no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// //Ruta para crear un Game (borrado lógico)
// const createGames = async (req, res) => {
//   try {
//     const { name, type, required_age, is_free, detailed_description, abouth_the_game, short_description, release_date, coming_soon,
//       support_info, metacritic, price_overview, header_image, capsule_image, developers, genres, publishers, platform, languages, categories } = req.body

//     const result = await Games.create({
//       name: name,
//       type: type,
//       required_age: required_age,
//       is_free: is_free,
//       detailed_description: detailed_description,
//       abouth_the_game: abouth_the_game,
//       short_description: short_description,
//       release_date: release_date,
//       coming_soon: coming_soon,
//       support_info: support_info,
//       metacritic: metacritic,
//       price_overview: price_overview,
//       header_image: header_image,
//       capsule_image: capsule_image,

//     })

//     const developersSet = new Set();
//     if (developers.length > 0) {
//       developers.map(developer => developersSet.add(developer));
//     }

//     for (const developer of developersSet) {
//       const relationDeveloper = await Developers.findOrCreate({ where: { developer: developer } });
//       await result.addDevelopers(relationDeveloper[0]);
//     }


//     const genresSet = new Set();

//     if (genres.length > 0) {
//       genres.map(genre => genresSet.add(genre));
//     }

//     for (const genre of genresSet) {
//       const relationGenres = await Genres.findOrCreate({ where: { genre: genre } });
//       await result.addGenres(relationGenres[0]);
//     }

//     const publishersSet = new Set();

//     if (publishers.length > 0) {
//       publishers.map(publisher => publishersSet.add(publisher));
//     }

//     for (const publisher of publishersSet) {
//       const relationPublisher = await Publishers.findOrCreate({ where: { publisher: publisher } });
//       await result.addPublishers(relationPublisher[0]);
//     }

//     const platformsSet = new Set();

//     if (platform.length > 0) {
//       platform.map(platform => platformsSet.add(platform));
//     }

//     for (const platform of platformsSet) {
//       const relationPlatforms = await Platforms.findOrCreate({ where: { platform: platform } });
//       await result.addPlatforms(relationPlatforms[0]);
//     }

//     const languagesSet = new Set();

//     if (languages.length > 0) {
//       languages.map(language => languagesSet.add(language))
//     }

//     for (const language of languagesSet) {
//       const relationLanguage = await Languages.findOrCreate({ where: { language: language } });
//       await result.addLanguages(relationLanguage[0]);
//     }

//     const categoriesSet = new Set();

//     if (categories.length > 0) {
//       categories.map(category => categoriesSet.add(category));
//     }

//     for (const category of categoriesSet) {
//       const relationCategory = await Categories.findOrCreate({ where: { category: category } });
//       await result.addCategories(relationCategory[0]);
//     }
//     res.status(200).json("Juego creado");
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
// //Ruta para eliminar un Game (borrado lógico)
// const deleteGame = async (req, res) => {
//   try {
//     let deletedGame;

//     if (req.query.name) {
//       deletedGame = await Games.destroy({ where: { name: req.query.name } });
//     } else {
//       const {id} = req.params;
//       deletedGame = await Games.destroy({ where: { id: id } });
//     }

//     if (deletedGame) {
//       res.status(200).json({ message: 'Juego eliminado correctamente' });
//     } else {
//       res.status(404).json({ message: 'Juego no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// //Ruta para actuliazr un Game por ID (borrado lógico)
// const updateGame = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, type, required_age, is_free, detailed_description, abouth_the_game, short_description, release_date, coming_soon, support_info, metacritic,
//       price_overview, header_image, capsule_image, developers, genres, publishers, platform, languages, categories } = req.body;

//     let game = await Games.findByPk(id); // Obtener la instancia del juego por su id

//     if (!game) {
//       return res.status(404).json({ error: 'Juego no encontrado' });
//     }
//     Categories, Developers, Genres, Languages, Platforms, Publishers
//     await game.setDevelopers([]); // Eliminar la relación anterior
//     await game.setPublishers([]);
//     await game.setPlatforms([]);
//     await game.setLanguages([]);
//     await game.setGenres([]);
//     await game.setCategories([]);

//     game.name = name;
//     game.type = type;
//     game.required_age = required_age;
//     game.is_free = is_free;
//     game.detailed_description = detailed_description;
//     game.abouth_the_game = abouth_the_game;
//     game.short_description = short_description;
//     game.release_date = release_date;
//     game.coming_soon = coming_soon;
//     game.support_info = support_info;
//     game.metacritic = metacritic;
//     game.price_overview = price_overview;
//     game.header_image = header_image;
//     game.capsule_image = capsule_image;

//     await game.save(); // Guardar los cambios en la base de datos

//     const developersSet = new Set();
//     if (developers.length > 0) {
//       developers.map(developer => developersSet.add(developer));
//     }

//     for (const developer of developersSet) {
//       const relationDeveloper = await Developers.findOrCreate({ where: { developer: developer } });
//       await game.addDevelopers(relationDeveloper[0]);
//     }

//     const genresSet = new Set();

//     if (genres.length > 0) {
//       genres.map(genre => genresSet.add(genre));
//     }

//     for (const genre of genresSet) {
//       const relationGenres = await Genres.findOrCreate({ where: { genre: genre } });
//       await game.addGenres(relationGenres[0]);
//     }

//     const publishersSet = new Set();

//     if (publishers.length > 0) {
//       publishers.map(publisher => publishersSet.add(publisher));
//     }

//     for (const publisher of publishersSet) {
//       const relationPublisher = await Publishers.findOrCreate({ where: { publisher: publisher } });
//       await game.addPublishers(relationPublisher[0]);
//     }

//     const platformsSet = new Set();

//     if (platform.length > 0) {
//       platform.map(platform => platformsSet.add(platform));
//     }

//     for (const platform of platformsSet) {
//       const relationPlatforms = await Platforms.findOrCreate({ where: { platform: platform } });
//       await game.addPlatforms(relationPlatforms[0]);
//     }

//     const languagesSet = new Set();

//     if (languages.length > 0) {
//       languages.map(language => languagesSet.add(language))
//     }

//     for (const language of languagesSet) {
//       const relationLanguage = await Languages.findOrCreate({ where: { language: language } });
//       await game.addLanguages(relationLanguage[0]);
//     }

//     const categoriesSet = new Set();

//     if (categories.length > 0) {
//       categories.map(category => categoriesSet.add(category));
//     }

//     for (const category of categoriesSet) {
//       const relationCategory = await Categories.findOrCreate({ where: { category: category } });
//       await game.addCategories(relationCategory[0]);
//     }
//     res.status(200).json({ message: 'Juego actualizado correctamente' });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Ruta para banear un Game (borrado lógico)
// const banGame = async (req, res) => {
//   try {
//     let bannedGame;

//     if (req.query.name) {
//       // Bannear juego por nombre
//       bannedGame = await Games.findOne({ where: { name: req.query.name } });
//     } else if (req.params.gamesId) {
//       // Bannear juego por ID
//       bannedGame = await Games.findByPk(req.params.gamesId);
//     }

//     if (!bannedGame) {
//       return res.status(404).json({ error: 'Juego no encontrado' });
//     }

//     bannedGame.status = 'baneado';
//     bannedGame.bannedAt = new Date();
//     await bannedGame.save();

//     res.json({ message: 'Juego baneado exitosamente' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const reviewGames = async (req, res) => {
//   try {
//     const { id } = req.body

//     const game = await Games.findByPk(id, {
//       attributes: { exclude: ['id'] },
//       include: [
//         { model: Reviews, attributes: ['reviews', 'rating', 'date'], through: { attributes: [] } }
//       ]
//     })
//     res.status(200).json(game)
//   } catch (error) {
//     res.status(400).send(error.message)
//   }
// }


// module.exports = {
//   getAllGames,
//   getGame,
//   createGames,
//   deleteGame,
//   updateGame,
//   banGame,
//   reviewGames
// };
const { Games, Categories, Developers, Genres, Languages, Platforms, Publishers, Reviews } = require('../db');
const transporter = require('../middlewares/nodemailer')

// Ruta para traer todos los Games creados (borrado lógico)
const getAllGames = async (req, res) => {
  try {
    const games = await Games.findAll();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//Ruta para buscar un Game por ID creado (borrado lógico)
const getGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.query;

    let game;
    if (name) {
      // Si se proporciona el parámetro de nombre, buscar por nombre
      game = await Games.findOne({ where: { name } });
    } else if (id) {
      // Si se proporciona el parámetro de ID, buscar por ID
      game = await Games.findByPk(id);
    }

    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: 'Juego no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//Ruta para crear un Game (borrado lógico)
const createGames = async (req, res) => {
  try {
    const { name, type, required_age, is_free, detailed_description, abouth_the_game, short_description, release_date, coming_soon,
      support_info, metacritic, price_overview, header_image, capsule_image, developers, genres, publishers, platform, languages, categories } = req.body

    const result = await Games.create({
      name: name,
      type: type,
      required_age: required_age,
      is_free: is_free,
      detailed_description: detailed_description,
      abouth_the_game: abouth_the_game,
      short_description: short_description,
      release_date: release_date,
      coming_soon: coming_soon,
      support_info: support_info,
      metacritic: metacritic,
      price_overview: price_overview,
      header_image: header_image,
      capsule_image: capsule_image,

    })

    const developersSet = new Set();
    if (developers.length > 0) {
      developers.map(developer => developersSet.add(developer));
    }

    for (const developer of developersSet) {
      const relationDeveloper = await Developers.findOrCreate({ where: { developer: developer } });
      await result.addDevelopers(relationDeveloper[0]);
    }


    const genresSet = new Set();

    if (genres.length > 0) {
      genres.map(genre => genresSet.add(genre));
    }

    for (const genre of genresSet) {
      const relationGenres = await Genres.findOrCreate({ where: { genre: genre } });
      await result.addGenres(relationGenres[0]);
    }

    const publishersSet = new Set();

    if (publishers.length > 0) {
      publishers.map(publisher => publishersSet.add(publisher));
    }

    for (const publisher of publishersSet) {
      const relationPublisher = await Publishers.findOrCreate({ where: { publisher: publisher } });
      await result.addPublishers(relationPublisher[0]);
    }

    const platformsSet = new Set();

    if (platform.length > 0) {
      platform.map(platform => platformsSet.add(platform));
    }

    for (const platform of platformsSet) {
      const relationPlatforms = await Platforms.findOrCreate({ where: { platform: platform } });
      await result.addPlatforms(relationPlatforms[0]);
    }

    const languagesSet = new Set();

    if (languages.length > 0) {
      languages.map(language => languagesSet.add(language))
    }

    for (const language of languagesSet) {
      const relationLanguage = await Languages.findOrCreate({ where: { language: language } });
      await result.addLanguages(relationLanguage[0]);
    }

    const categoriesSet = new Set();

    if (categories.length > 0) {
      categories.map(category => categoriesSet.add(category));
    }

    for (const category of categoriesSet) {
      const relationCategory = await Categories.findOrCreate({ where: { category: category } });
      await result.addCategories(relationCategory[0]);
    }
    res.status(200).json("Juego creado");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//Ruta para eliminar un Game (borrado lógico)
const deleteGame = async (req, res) => {
  try {
    let deletedGame;

    if (req.query.name) {
      deletedGame = await Games.destroy({ where: { name: req.query.name } });
    } else {
      const {id} = req.params;
      deletedGame = await Games.destroy({ where: { id: id } });
    }

    if (deletedGame) {
      res.status(200).json({ message: 'Juego eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Juego no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Ruta para actuliazr un Game por ID (borrado lógico)
const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, required_age, is_free, detailed_description, abouth_the_game, short_description, release_date, coming_soon, support_info, metacritic,
      price_overview, header_image, capsule_image, developers, genres, publishers, platform, languages, categories } = req.body;

    let game = await Games.findByPk(id); // Obtener la instancia del juego por su id

    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }
    Categories, Developers, Genres, Languages, Platforms, Publishers
    await game.setDevelopers([]); // Eliminar la relación anterior
    await game.setPublishers([]);
    await game.setPlatforms([]);
    await game.setLanguages([]);
    await game.setGenres([]);
    await game.setCategories([]);

    game.name = name;
    game.type = type;
    game.required_age = required_age;
    game.is_free = is_free;
    game.detailed_description = detailed_description;
    game.abouth_the_game = abouth_the_game;
    game.short_description = short_description;
    game.release_date = release_date;
    game.coming_soon = coming_soon;
    game.support_info = support_info;
    game.metacritic = metacritic;
    game.price_overview = price_overview;
    game.header_image = header_image;
    game.capsule_image = capsule_image;

    await game.save(); // Guardar los cambios en la base de datos

    const developersSet = new Set();
    if (developers.length > 0) {
      developers.map(developer => developersSet.add(developer));
    }

    for (const developer of developersSet) {
      const relationDeveloper = await Developers.findOrCreate({ where: { developer: developer } });
      await game.addDevelopers(relationDeveloper[0]);
    }

    const genresSet = new Set();

    if (genres.length > 0) {
      genres.map(genre => genresSet.add(genre));
    }

    for (const genre of genresSet) {
      const relationGenres = await Genres.findOrCreate({ where: { genre: genre } });
      await game.addGenres(relationGenres[0]);
    }

    const publishersSet = new Set();

    if (publishers.length > 0) {
      publishers.map(publisher => publishersSet.add(publisher));
    }

    for (const publisher of publishersSet) {
      const relationPublisher = await Publishers.findOrCreate({ where: { publisher: publisher } });
      await game.addPublishers(relationPublisher[0]);
    }

    const platformsSet = new Set();

    if (platform.length > 0) {
      platform.map(platform => platformsSet.add(platform));
    }

    for (const platform of platformsSet) {
      const relationPlatforms = await Platforms.findOrCreate({ where: { platform: platform } });
      await game.addPlatforms(relationPlatforms[0]);
    }

    const languagesSet = new Set();

    if (languages.length > 0) {
      languages.map(language => languagesSet.add(language))
    }

    for (const language of languagesSet) {
      const relationLanguage = await Languages.findOrCreate({ where: { language: language } });
      await game.addLanguages(relationLanguage[0]);
    }

    const categoriesSet = new Set();

    if (categories.length > 0) {
      categories.map(category => categoriesSet.add(category));
    }

    for (const category of categoriesSet) {
      const relationCategory = await Categories.findOrCreate({ where: { category: category } });
      await game.addCategories(relationCategory[0]);
    }
    res.status(200).json({ message: 'Juego actualizado correctamente' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Ruta para banear un Game (borrado lógico)
const banGame = async (req, res) => {
  try {
    let bannedGame;

    if (req.query.name) {
      // Bannear juego por nombre
      bannedGame = await Games.findOne({ where: { name: req.query.name } });
    } else if (req.params.gamesId) {
      // Bannear juego por ID
      bannedGame = await Games.findByPk(req.params.gamesId);
    }

    if (!bannedGame) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    bannedGame.status = 'baneado';
    bannedGame.bannedAt = new Date();
    await bannedGame.save();

    await transporter.sendMail({
      from: '"Game Accessibility Notification" <carrizosamayito@gmail.com>', // sender address
      to: `carrizosamayito@gmail.com`, // list of receivers
      subject: "Game Accessibility Notification", // Subject line
      html:  `<h1>Game Accessibility Notification</h1>
              <p>Dear Admin,</p>
              <p>We would like to inform you that a game in our platform has been banned and is no longer accessible. Below are the details:</p>
              <p><strong>Game:</strong> ${bannedGame.name}</p>
              <p>Please take the necessary steps to ensure that the game is removed from the platform and is no longer available for users.</p>
              <p>If you require any additional information or have any questions regarding this ban, please don't hesitate to contact us.</p>
              <p>Thank you for your prompt attention to this matter.</p>
              <p>Best regards,</p>
              <p>The Gamezone Team</p>`
      }
  )

    res.json({ message: 'Juego baneado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const reviewGames = async (req, res) => {
  try {
    const { id } = req.body

    const game = await Games.findByPk(id, {
      attributes: { exclude: ['id'] },
      include: [
        { model: Reviews, attributes: ['reviews', 'rating', 'date'], through: { attributes: [] } }
      ]
    })
    res.status(200).json(game)
  } catch (error) {
    res.status(400).send(error.message)
  }
}


module.exports = {
  getAllGames,
  getGame,
  createGames,
  deleteGame,
  updateGame,
  banGame,
  reviewGames
};