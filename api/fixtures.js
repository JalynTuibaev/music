const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Album = require('./models/Album');
const Artist = require('./models/Artist');
const Track = require('./models/Track');


const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user1, user2] = await User.create({
        username: 'admin',
        password: 'admin',
        token: nanoid(),
        role: 'admin',
    }, {
        username: 'user',
        password: 'user',
        token: nanoid(),
        role: 'user',
    });

    const [scrip, weeknd, jah] = await Artist.create({
        name: 'Скриптонит',
        info: 'Ади́ль Оралбе́кович Жале́лов, урожд. — Кулмагамбе́тов, более известный под сценическим псевдонимом Скриптони́т, — казахстанский исполнитель и музыкальный продюсер, основатель лейбла Musica36',
        image: 'fixtures/scrip.jpeg',
        published: true,
    }, {
        name: 'The Weeknd',
        info: 'Abel Makkonen Tesfaye; род. 16 февраля 1990 года, Торонто, Онтарио, Канада), более известный под сценическим именем The Weeknd (Уи́кнд) — канадский певец, автор песен и музыкальный продюсер эфиопского происхождения. В конце 2010 года Тесфайе анонимно загрузил несколько песен на YouTube под именем «The Weeknd»',
        image: 'fixtures/weeknd.jpg'
    }, {
        name: 'Jah Khalib',
        info: 'Бахтияр Мамедов родился 29 сентября 1993 года в Алма-Ате. Отец, Гусейн Мамедов — азербайджанец; мать, Ляззат Мамедова — казашка, из рода найманов. С детства увлекался рэпом. Учился в музыкальной школе по классу саксофона.',
        image: 'fixtures/jah.jpg'
    });

    const [albumScrip1, albumScrip2, albumWeeknd1, albumWeeknd2, albumJah1] = await Album.create({
        name: 'Дом с нормальными явлениями',
        artist: scrip._id,
        release: '24 ноября 2015 г.',
        image: 'fixtures/dom-s-norm.jpg',
        published: true,
    }, {
        name: 'Праздник на улице 36',
        artist: scrip._id,
        release: '24 мая 2017 г.',
        image: 'fixtures/prazdnik.jpg'
    }, {
        name: 'Starboy',
        artist: weeknd._id,
        release: '25 ноября 2016 г',
        image: 'fixtures/The_Weeknd_-_Starboy.png'
    }, {
        name: 'After Hours',
        artist: weeknd._id,
        release: '20 марта 2020 г.',
        image: 'fixtures/274px-The_Weeknd_-_After_Hours.png'
    }, {
        name: 'Мудрец',
        artist: jah._id,
        release: '22 января 2021 г.',
        image: 'fixtures/mudrec.jpg'
    });

    await Track.create({
        name: 'Интро',
        album: albumScrip1._id,
        duration: '01:19',
        published: true,
    }, {
        name: 'Коньяк',
        album: albumScrip1._id,
        duration: '02:29',
        published: true,
    }, {
        name: 'Притон',
        album: albumScrip1._id,
        duration: '03:56',
        published: true,
    }, {
        name: 'Танцуй сама',
        album: albumScrip1._id,
        duration: '02:12'
    }, {
        name: 'Вниз',
        album: albumScrip1._id,
        duration: '01:50'
    }, {
        name: 'Цепи',
        album: albumScrip2._id,
        duration: '03:27'
    }, {
        name: 'Поворот',
        album: albumScrip2._id,
        duration: '03:12'
    }, {
        name: 'Капли вниз по бёдрам',
        album: albumScrip2._id,
        duration: '03:32'
    }, {
        name: 'Напомни',
        album: albumScrip2._id,
        duration: '03:50'
    }, {
        name: 'Ага, ну',
        album: albumScrip2._id,
        duration: '03:06'
    }, {
        name: 'Starboy',
        album: albumWeeknd1._id,
        duration: '03:53'
    }, {
        name: 'Reminder',
        album: albumWeeknd1._id,
        duration: '02:32'
    }, {
        name: 'True Colors',
        album: albumWeeknd1._id,
        duration: '03:26'
    }, {
        name: 'Secrets',
        album: albumWeeknd1._id,
        duration: '02:45'
    }, {
        name: 'Sidewalks',
        album: albumWeeknd1._id,
        duration: '03:51'
    }, {
        name: 'Alone again',
        album: albumWeeknd2._id,
        duration: '04:01'
    }, {
        name: 'Too late',
        album: albumWeeknd2._id,
        duration: '03:06'
    }, {
        name: 'Flashing lights',
        album: albumWeeknd2._id,
        duration: '03:32'
    }, {
        name: 'Faith',
        album: albumWeeknd2._id,
        duration: '03:06'
    }, {
        name: 'Heartless',
        album: albumWeeknd2._id,
        duration: '03:18'
    }, {
        name: 'Моя любовь',
        album: albumJah1._id,
        duration: '03:21'
    }, {
        name: 'Талисман',
        album: albumJah1._id,
        duration: '03:50'
    }, {
        name: 'Я не прощу',
        album: albumJah1._id,
        duration: '02:50'
    }, {
        name: 'Во сне',
        album: albumJah1._id,
        duration: '02:43'
    }, {
        name: 'Искал-нашёл',
        album: albumJah1._id,
        duration: '03:25'
    });

    await mongoose.connection.close();
};

run().catch(console.error);

