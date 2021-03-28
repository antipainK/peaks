exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('peaks').del();
  await knex('peaks').insert([
    {
      name: 'Łysica',
      latitude: 50.890833,
      longitude: 20.900833,
      abs_height: 614,
      description:
        'Najwyższy szczyt Gór Świętokrzyskich. Znajduje się w obszarze ochrony ścisłej Świętokrzyskiego Parku Narodowego. Nazywany również Górą Świętej Katarzyny.',
      mountain_range: 'Góry Świętokrzyskie',
    },
    {
      name: 'Ślęża',
      latitude: 50.865,
      longitude: 16.708611,
      abs_height: 718,
      description:
        "'Góra Sobótka'. Najwyższy szczyt Masywu Ślęży i całego Przedgórza Sudeckiego. Jego wysokość względna wynosi ponad 500m.",
      mountain_range: 'Masyw Ślęży (Przedgórze Sudeckie)',
    },
    {
      name: 'Skopiec',
      latitude: 50.944444,
      longitude: 15.885,
      abs_height: 719,
      description:
        'Jest trzecim co do wysokości szczytem Gór Kaczawskich. Powierzchnia wierzchowiny jest tak wyrównana, że wierzchołek jest trudno rozpoznawalny w terenie.',
      mountain_range: 'Góry Kaczawskie',
    },
    {
      name: 'Kłodzka Góra',
      latitude: 50.451653,
      longitude: 16.753211,
      abs_height: 757,
      description:
        'Drugi pod względem wysokości szczyt Gór Bardzkich, położony w ich południowo-wschodniej części.',
      mountain_range: 'Góry Bardzkie',
    },
    {
      name: 'Chełmiec',
      latitude: 50.779167,
      longitude: 16.210278,
      abs_height: 850,
      description:
        'Chełmiec to drugi co do wysokości szczyt Gór Wałbrzyskich. Góruje ponad Kotliną Wałbrzyską, między Wałbrzychem, Boguszowem a Szczawnem.',
      mountain_range: 'Góry Wałbrzyskie',
    },
    {
      name: 'Biskupia Kopa',
      latitude: 50.256002,
      longitude: 17.422791,
      abs_height: 890,
      description:
        'Biskupia Kopa jest od wieków górą graniczną – od 1229 rozdzielała biskupstwa wrocławskie i ołomunieckie, po wojnach śląskich tereny Czechosłowacji i Niemiec, a obecnie granicę polsko-czeską.',
      mountain_range: 'Góry Opawskie',
    },
    {
      name: 'Lubomir',
      latitude: 49.766944,
      longitude: 20.059722,
      abs_height: 904,
      description:
        'Nazwa szczytu pochodzi od nazwiska księcia Kazimierza Lubomirskiego.',
      mountain_range: 'Beskid Makowski',
    },
    {
      name: 'Szczeliniec Wielki',
      latitude: 50.485833,
      longitude: 16.339167,
      abs_height: 919,
      description:
        "Inaczej 'Strzaskany', 'Spękany', 'Stołowiec'. Znajduje się na terenie Parku Narodowego Gór Stołowych. Należy do Korony Gór Polskich.",
      mountain_range: 'Góry Stołowe',
    },
    {
      name: 'Czupel',
      latitude: 49.766111,
      longitude: 19.155278,
      abs_height: 930,
      description:
        'Cały masyw Czupla jest zalesiony. W lasach zaliczanych do piętra regla dolnego, dominuje buk z domieszką świerka, występuje dość rzadka naparstnica purpurowa i rzadki gatunek chrząszcza – biegacz pomarszczony.',
      mountain_range: 'Beskid Mały',
    },
    {
      name: 'Waligóra',
      latitude: 50.683333,
      longitude: 16.283333,
      abs_height: 936,
      description:
        'Szczyt stał się celem wycieczek już w XIX w, gdy był odsłonięty i stanowił dobry punkt widokowy. Po roku 1945 istniała na nim drewniana wieża triangulacyjno-widokowa, jednak popadła w ruinę i została rozebrana.',
      mountain_range: 'Góry Kamienne',
    },
    {
      name: 'Skalnik',
      latitude: 50.808469,
      longitude: 15.900069,
      abs_height: 944,
      description:
        'Góra jest najwyższym szczytem Rudaw Janowickich, wyraźnie wydzielonym Przełęczą pod Bobrzakiem i Przełęczą Rudawską, o średnio stromych zboczach, które podkreślają wzniesienie w terenie.',
      mountain_range: 'Rudawy Janowickie',
    },
    {
      name: 'Jagodna',
      latitude: 50.252461,
      longitude: 16.564417,
      abs_height: 985,
      description:
        'Góra zbudowana jest z odpornych na wietrzenie granitognejsów należących do metamorfiku Gór Bystrzyckich i Orlickich oraz z górnokredowych piaskowców.',
      mountain_range: 'Góry Bystrzyckie',
    },
    {
      name: 'Kowadło',
      latitude: 50.264433,
      longitude: 17.013219,
      abs_height: 988,
      description:
        'Ze szczytu można podziwiać widoki na Góry Złote i północną część Wysokiego Jesionika oraz pogórze sudeckie aż po Nysę a nawet Opole.',
      mountain_range: 'Góry Złote',
    },
    {
      name: 'Lackowa',
      latitude: 49.428333,
      longitude: 21.096111,
      abs_height: 997,
      description: 'Pierwotnie góra nosiła łemkowską nazwę Łackowa (Wackowa).',
      mountain_range: 'Beskid Niski',
    },
    {
      name: 'Wielka Sowa',
      latitude: 50.680158,
      longitude: 16.485497,
      abs_height: 1015,
      description:
        'Najwyższy szczyt Gór Sowich w Sudetach Środkowych, z najbardziej zniszczonym ekologicznie drzewostanem w tych górach.',
      mountain_range: 'Góry Sowie',
    },
    {
      name: 'Wysoka (Wysokie Skałki)',
      latitude: 49.380278,
      longitude: 20.555556,
      abs_height: 1050,
      description:
        'Szczyt położony na granicy polsko-słowackiej. Najwyższy z całych Pienin.',
      mountain_range: 'Pieniny',
    },
    {
      name: 'Orlica',
      latitude: 50.353186,
      longitude: 16.360719,
      abs_height: 1084,
      description:
        'Leży na europejskim dziale wodnym pomiędzy zlewiskami Morza Bałtyckiego i Morza Północnego. Jej wierzchołek leży po stronie czeskiej.',
      mountain_range: 'Góry Orlickie',
    },
    {
      name: 'Rudawiec',
      latitude: 50.244056,
      longitude: 16.975889,
      abs_height: 1106,
      description:
        "Inaczej 'Bieleń', 'Ruda Paprotnia', 'Rude Bagna'. Trzeci co do wysokości szczyt Gór Bialskich.",
      mountain_range: 'Góry Bialskie',
    },
    {
      name: 'Wysoka Kopa',
      latitude: 50.850278,
      longitude: 15.42,
      abs_height: 1128,
      description:
        'Łagodna kopuła zbudowana z granitów, gnejsów i łupków, należących do bloku karkonosko-izerskiego.',
      mountain_range: 'Góry Izerskie',
    },
    {
      name: 'Mogielica',
      latitude: 49.655194,
      longitude: 20.276694,
      abs_height: 1170,
      description:
        'Według jednej z legend, Mogielica była żoną wielkoluda Łopienia, oddzieloną od małżonka Przełęczą Rydza Śmigłego.',
      mountain_range: 'Beskid Wyspowy',
    },
    {
      name: 'Skrzyczne',
      latitude: 49.684444,
      longitude: 19.030278,
      abs_height: 1257,
      description:
        'Nazwa góry ma pochodzić od skrzeczenia żab, które w wielkiej ilości zamieszkiwały staw, kiedyś istniejący podobno w kotle między Skrzycznem a Małym Skrzycznem.',
      mountain_range: 'Beskid Śląski',
    },
    {
      name: 'Radziejowa',
      latitude: 49.449444,
      longitude: 20.604444,
      abs_height: 1267,
      description:
        'Nazwa szczytu pochodzi od osoby o nazwisku Radziej. Należy do Korony Gór Polski.',
      mountain_range: 'Beskid Sądecki',
    },
    {
      name: 'Turbacz',
      latitude: 49.542944,
      longitude: 20.111556,
      abs_height: 1310,
      description:
        "Już w XIX wieku była znanym celem turystycznym, którą opisuje m.in. Seweryn Goszczyński w swoim 'Dzienniku Podróży do Tatrów'.",
      mountain_range: 'Gorce',
    },
    {
      name: 'Tarnica',
      latitude: 49.074778,
      longitude: 22.72675,
      abs_height: 1346,
      description:
        'Najwyższy szczyt polskich Bieszczadów i województwa podkarpackiego, wznoszący się na krańcu pasma połonin. Należy do Korony Gór Polski.',
      mountain_range: 'Bieszczady',
    },
    {
      name: 'Śnieżnik',
      latitude: 50.207004,
      longitude: 16.849226,
      abs_height: 1423,
      description:
        'Jest on jedyną górą w masywie Śnieżnika, która wystaje ponad górną granicę lasu. Jest rozrogiem - zwornikiem sześciu grzbietów.',
      mountain_range: 'Masyw Śnieżnika',
    },
    {
      name: 'Śnieżka',
      latitude: 50.735833,
      longitude: 15.739167,
      abs_height: 1602,
      description:
        'Zlokalizowana na granicy polsko-czeskiej, góruje nad Kotliną Jeleniogórską. Po stronie polskiej znajduje się w granicach administracyjnych Karpacza oraz na terenie Karkonoskiego Parku Narodowego.',
      mountain_range: 'Karkonosze',
    },
    {
      name: 'Babia Góra',
      latitude: 49.573333,
      longitude: 19.529444,
      abs_height: 1725,
      description:
        'Pochodzenie nazwy Babia Góra tłumaczą liczne legendy ludowe. Jedna z nich mówi, że jest to kupa kamieni wysypanych przed chałupą przez babę – olbrzymkę.',
      mountain_range: 'Beskid Żywiecki',
    },
    {
      name: 'Rysy',
      latitude: 49.179306,
      longitude: 20.088444,
      abs_height: 2501,
      description:
        'Góra położona na granicy polsko-słowackiej, w Tatrach Wysokich. Ma trzy wierzchołki, z których najwyższy (2501m) położony jest na terytorium Słowacji.',
      mountain_range: 'Tatry',
    },
  ]);
};
