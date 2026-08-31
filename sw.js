// Service worker: makes Mo Arcade fully playable with NO internet.
// It pre-caches every game so once the site loads online once, all games work offline.
// Bump CACHE whenever you change the site so phones pick up the new version.
const CACHE = "mo-arcade-v306";
const FILES = [
  "./", "./index.html", "./games.html", "./mo-home.html", "./privacy.html", "./icon-180.png",
  "./icon-192.png", "./icon-512-maskable.png", "./icon-512.png", "./icon.svg", "./manifest.webmanifest", "./three.min.js",
  "./mo-arffmeow/mo-arffmeow.html",
  "./hoop-shot-3d.html", "./hoop-shot.html", "./mo-1on1/mo-1on1.html", "./mo-2k/mo-2k.html", "./mo-2k26/mo-2k26.html", "./mo-3dcity/mo-3dcity.html",
  "./mo-3devent/mo-3devent.html", "./mo-3point/mo-3point.html", "./mo-8ball/mo-8ball.html", "./mo-airport/mo-airport.html", "./mo-alien/mo-alien.html", "./mo-allstar/mo-allstar.html",
  "./mo-ankle/mo-ankle.html", "./mo-apartmentbldg/mo-apartmentbldg.html", "./mo-aquarium/mo-aquarium.html", "./mo-aquarium2/mo-aquarium2.html", "./mo-aquariumfeed/mo-aquariumfeed.html", "./mo-arena-3d/mo-arena-3d.html",
  "./mo-arff/mo-arff.html", "./mo-random/mo-random.html", "./mo-arff-ads/mo-arff-ads.html", "./mo-housedesign/mo-housedesign.html", "./mo-arffart/mo-arffart.html", "./mo-arffastro/mo-arffastro.html", "./mo-arffbath/mo-arffbath.html", "./mo-arffbday/mo-arffbday.html", "./mo-arffbeach/mo-arffbeach.html",
  "./mo-arffbirdrace/mo-arffbirdrace.html", "./mo-arffbullride/mo-arffbullride.html", "./mo-arffcamelrace/mo-arffcamelrace.html", "./mo-arffcamp/mo-arffcamp.html", "./mo-arffchase/mo-arffchase.html", "./mo-arffchef/mo-arffchef.html",
  "./mo-arffcitytour/mo-arffcitytour.html", "./mo-arffcliffdive/mo-arffcliffdive.html", "./mo-arffcliffwaterjump/mo-arffcliffwaterjump.html", "./mo-arffcontest/mo-arffcontest.html", "./mo-arffcrossbowchallenge/mo-arffcrossbowchallenge.html", "./mo-arffdash/mo-arffdash.html",
  "./mo-arffdelivery/mo-arffdelivery.html", "./mo-arffdetective/mo-arffdetective.html", "./mo-arffdiving/mo-arffdiving.html", "./mo-arffdoc/mo-arffdoc.html", "./mo-arfffarm/mo-arfffarm.html",
  "./mo-arfffire/mo-arfffire.html", "./mo-arfffirefighter/mo-arfffirefighter.html", "./mo-arfffish/mo-arfffish.html", "./mo-arffgarden/mo-arffgarden.html", "./mo-arffgroom/mo-arffgroom.html", "./mo-arffhorserace/mo-arffhorserace.html",
  "./mo-arffhotel/mo-arffhotel.html", "./mo-arffjetski/mo-arffjetski.html", "./mo-arffkarate/mo-arffkarate.html", "./mo-arffkayak/mo-arffkayak.html", "./mo-arffknifeThrow/mo-arffknifeThrow.html", "./mo-arffkungfu/mo-arffkungfu.html",
  "./mo-arfflasershooting/mo-arfflasershooting.html", "./mo-arffmail/mo-arffmail.html", "./mo-arffmarksman/mo-arffmarksman.html", "./mo-arffmotocross/mo-arffmotocross.html", "./mo-arffninjaStar/mo-arffninjaStar.html", "./mo-arffobstacle/mo-arffobstacle.html",
  "./mo-arffpark/mo-arffpark.html", "./mo-arffparkourclimb/mo-arffparkourclimb.html", "./mo-arffpizza/mo-arffpizza.html", "./mo-arffpolice/mo-arffpolice.html", "./mo-arffracer/mo-arffracer.html",
  "./mo-arffropeswing/mo-arffropeswing.html", "./mo-arffschool/mo-arffschool.html", "./mo-arffskateboardrail/mo-arffskateboardrail.html", "./mo-arffsky/mo-arffsky.html", 
  "./mo-arffspace/mo-arffspace.html", "./mo-arffsumo/mo-arffsumo.html", "./mo-arffsurfboard/mo-arffsurfboard.html", "./mo-arffswordfight/mo-arffswordfight.html", "./mo-arfftaekwondo/mo-arfftaekwondo.html", "./mo-arfftargetshooting/mo-arfftargetshooting.html",
  "./mo-arfftrapshooting/mo-arfftrapshooting.html", "./mo-arfftreats/mo-arfftreats.html", "./mo-arffwakeboard/mo-arffwakeboard.html", "./mo-aroundworld/mo-aroundworld.html", "./mo-artstudio/mo-artstudio.html", "./mo-balloon/mo-balloon.html",
  "./mo-balloonpop/mo-balloonpop.html", "./mo-bankteller/mo-bankteller.html", "./mo-barista/mo-barista.html", "./mo-baseball/mo-baseball.html", "./mo-beachbuild/mo-beachbuild.html", "./mo-beachclean/mo-beachclean.html",
  "./mo-beat/mo-beat.html", "./mo-beatmaker/mo-beatmaker.html", "./mo-bee/mo-bee.html", "./mo-behelper/mo-behelper.html", "./mo-bigday/mo-bigday.html", "./mo-bigtrip/mo-bigtrip.html",
  "./mo-birdaviary/mo-birdaviary.html", "./mo-bmx/mo-bmx.html", "./mo-bmxcontest/mo-bmxcontest.html", "./mo-bmxstop/mo-bmxstop.html", "./mo-boat-3d/mo-boat-3d.html", "./mo-bowling/mo-bowling.html",
  "./mo-bricks/mo-bricks.html", "./mo-build/mo-build.html", "./mo-buildtown/mo-buildtown.html", "./mo-burger/mo-burger.html", "./mo-bus-3d/mo-bus-3d.html", "./mo-busdriver/mo-busdriver.html",
  "./mo-busdriverjob/mo-busdriverjob.html", "./mo-businesstycoon/mo-businesstycoon.html", "./mo-butterfly/mo-butterfly.html", "./mo-butterflygarden/mo-butterflygarden.html", "./mo-buzzer/mo-buzzer.html", "./mo-campsite/mo-campsite.html",
  "./mo-candyfactory/mo-candyfactory.html", "./mo-carbuild/mo-carbuild.html", "./mo-carnival/mo-carnival.html", "./mo-carwash/mo-carwash.html", "./mo-castle/mo-castle.html", "./mo-castlebuild/mo-castlebuild.html",
  "./mo-castlejump/mo-castlejump.html", "./mo-catcafe/mo-catcafe.html", "./mo-catchbus/mo-catchbus.html", "./mo-cathouse/mo-cathouse.html", "./mo-catpark/mo-catpark.html", "./mo-championship/mo-championship.html",
  "./mo-chef/mo-chef.html", "./mo-chopper/mo-chopper.html", "./mo-christmas/mo-christmas.html", "./mo-city-3d/mo-city-3d.html", "./mo-city-open/mo-city-open.html", "./mo-city-walk-3d/mo-city-walk-3d.html",
  "./mo-citybuild/mo-citybuild.html", "./mo-citycitizens/mo-citycitizens.html", "./mo-cityescape/mo-cityescape.html", "./mo-citygardener/mo-citygardener.html", "./mo-cityhospital/mo-cityhospital.html", "./mo-citylibrary/mo-citylibrary.html",
  "./mo-citymayor/mo-citymayor.html", "./mo-citymaze/mo-citymaze.html", "./mo-citymysteries/mo-citymysteries.html", "./mo-cityplanner/mo-cityplanner.html", "./mo-citypolice/mo-citypolice.html", "./mo-cityracing/mo-cityracing.html",
  "./mo-cityrepair/mo-cityrepair.html", "./mo-cityschool/mo-cityschool.html", "./mo-cleanbuild/mo-cleanbuild.html", "./mo-climb/mo-climb.html", "./mo-climb2/mo-climb2.html", "./mo-coaster/mo-coaster.html",
  "./mo-coffeeshop/mo-coffeeshop.html", "./mo-color/mo-color.html", "./mo-colormemory/mo-colormemory.html", "./mo-cookiebake/mo-cookiebake.html", "./mo-court-build/mo-court-build.html", "./mo-courtbuild/mo-courtbuild.html",
  "./mo-craneop/mo-craneop.html", "./mo-crossingguard/mo-crossingguard.html", "./mo-crosswalk/mo-crosswalk.html", "./mo-crowd/mo-crowd.html", "./mo-cupcake/mo-cupcake.html", "./mo-delivery/mo-delivery.html",
  "./mo-deliveryrace/mo-deliveryrace.html", "./mo-diner/mo-diner.html", "./mo-dino/mo-dino.html", "./mo-dinopark/mo-dinopark.html", "./mo-dinopark2/mo-dinopark2.html", "./mo-dinoworld/mo-dinoworld.html",
  "./mo-doctorvisit/mo-doctorvisit.html", "./mo-dodgeball/mo-dodgeball.html", "./mo-dogadopt/mo-dogadopt.html", "./mo-dogbeach/mo-dogbeach.html", "./mo-dogbirthday/mo-dogbirthday.html", "./mo-dogcamping/mo-dogcamping.html",
  "./mo-dogcastle/mo-dogcastle.html", "./mo-dogchef/mo-dogchef.html", "./mo-dogcircus/mo-dogcircus.html", "./mo-dogdaycare/mo-dogdaycare.html", "./mo-dogfarm/mo-dogfarm.html", "./mo-dogfashion/mo-dogfashion.html",
  "./mo-doggroom/mo-doggroom.html", "./mo-doghero/mo-doghero.html", "./mo-doghotel/mo-doghotel.html", "./mo-doghouse/mo-doghouse.html", "./mo-dogpark/mo-dogpark.html", "./mo-dogpool/mo-dogpool.html",
  "./mo-dogrescue/mo-dogrescue.html", "./mo-dogschool/mo-dogschool.html", "./mo-dogshow/mo-dogshow.html", "./mo-dogspace/mo-dogspace.html", "./mo-dogtrain/mo-dogtrain.html",
  "./mo-dogtreats/mo-dogtreats.html", "./mo-dogvet/mo-dogvet.html", "./mo-dogwash/mo-dogwash.html", "./mo-donut/mo-donut.html", "./mo-donutdec/mo-donutdec.html", "./mo-dragcontest/mo-dragcontest.html",
  "./mo-dragmaze/mo-dragmaze.html", "./mo-dragon/mo-dragon.html", "./mo-dragonfly/mo-dragonfly.html", "./mo-dragonquest/mo-dragonquest.html", "./mo-dragstop/mo-dragstop.html", "./mo-draw/mo-draw.html",
  "./mo-dreamhouse/mo-dreamhouse.html", "./mo-drive/mo-drive.html", "./mo-dunk/mo-dunk.html", "./mo-dunkcontest/mo-dunkcontest.html", "./mo-dunkstop/mo-dunkstop.html", "./mo-egg/mo-egg.html",
  "./mo-electrician/mo-electrician.html", "./mo-fairygarden/mo-fairygarden.html", "./mo-familyart/mo-familyart.html", "./mo-familybaseball/mo-familybaseball.html", "./mo-familybasketball/mo-familybasketball.html", "./mo-familybowling/mo-familybowling.html",
  "./mo-familybuilding/mo-familybuilding.html", "./mo-familycharades/mo-familycharades.html", "./mo-familycooking/mo-familycooking.html", "./mo-familydanceoff/mo-familydanceoff.html", "./mo-familyescaperoom/mo-familyescaperoom.html", "./mo-familyfort/mo-familyfort.html",
  "./mo-familyhockey/mo-familyhockey.html", "./mo-familyjokebattle/mo-familyjokebattle.html", "./mo-familyjungle/mo-familyjungle.html", "./mo-familykaraoke/mo-familykaraoke.html", "./mo-familymemory/mo-familymemory.html", "./mo-familymonsters/mo-familymonsters.html",
  "./mo-familymystery/mo-familymystery.html", "./mo-familyobstacle/mo-familyobstacle.html", "./mo-familyocean/mo-familyocean.html", "./mo-familypictionary/mo-familypictionary.html", "./mo-familypuzzle/mo-familypuzzle.html", "./mo-familyrelayrace/mo-familyrelayrace.html",
  "./mo-familyrescue/mo-familyrescue.html", "./mo-familyrhyme/mo-familyrhyme.html", "./mo-familyriddle/mo-familyriddle.html", "./mo-familysaveworld/mo-familysaveworld.html", "./mo-familyscavenger/mo-familyscavenger.html", "./mo-familysoccer/mo-familysoccer.html",
  "./mo-familyspace/mo-familyspace.html", "./mo-familyspotdiff/mo-familyspotdiff.html", "./mo-familystorytime/mo-familystorytime.html", "./mo-familytalentshow/mo-familytalentshow.html", "./mo-familytennis/mo-familytennis.html", "./mo-familytimemachine/mo-familytimemachine.html",
  "./mo-familytreasure/mo-familytreasure.html", "./mo-familytreasuredef/mo-familytreasuredef.html", "./mo-familytrivia/mo-familytrivia.html", "./mo-familyvolleyball/mo-familyvolleyball.html", "./mo-farm2/mo-farm2.html", "./mo-farmbuild/mo-farmbuild.html",
  "./mo-fastbreak/mo-fastbreak.html", "./mo-findaddress/mo-findaddress.html", "./mo-findlunch/mo-findlunch.html", "./mo-firefighter/mo-firefighter.html", "./mo-fishcatch/mo-fishcatch.html", "./mo-fishing/mo-fishing.html",
  "./mo-fishingcast/mo-fishingcast.html", "./mo-fishtank/mo-fishtank.html", "./mo-fixit/mo-fixit.html", "./mo-fixitrobot/mo-fixitrobot.html", "./mo-flappy/mo-flappy.html", "./mo-flappyfly/mo-flappyfly.html",
  "./mo-flyer/mo-flyer.html", "./mo-fooddelivery/mo-fooddelivery.html", "./mo-foodtruck/mo-foodtruck.html", "./mo-football/mo-football.html", "./mo-fortbuild/mo-fortbuild.html", "./mo-freethrow/mo-freethrow.html",
  "./mo-fruit/mo-fruit.html", "./mo-fruitslice/mo-fruitslice.html", "./mo-fullcourt/mo-fullcourt.html", "./mo-gamemodes/mo-gamemodes.html", "./mo-garbageroute/mo-garbageroute.html", "./mo-garden/mo-garden.html",
  "./mo-gardengrow/mo-gardengrow.html", "./mo-ghostescape/mo-ghostescape.html", "./mo-gobank/mo-gobank.html", "./mo-gokart/mo-gokart.html", "./mo-grocery/mo-grocery.html", "./mo-groceryrun/mo-groceryrun.html",
  "./mo-grocerystore/mo-grocerystore.html", "./mo-gymnastics/mo-gymnastics.html", "./mo-hailtaxi/mo-hailtaxi.html", "./mo-haircut/mo-haircut.html", "./mo-halfcourt/mo-halfcourt.html", "./mo-halloween/mo-halloween.html",
  "./mo-harbor/mo-harbor.html", "./mo-hardware/mo-hardware.html", "./mo-helirescue/mo-helirescue.html", "./mo-hero/mo-hero.html", "./mo-hiddenlocs/mo-hiddenlocs.html", "./mo-home/mo-home.html",
  "./mo-homerun/mo-homerun.html", "./mo-hoop-builder/mo-hoop-builder.html", "./mo-horsecontest/mo-horsecontest.html", "./mo-horseranch/mo-horseranch.html", "./mo-horsestop/mo-horsestop.html", "./mo-hotdog/mo-hotdog.html",
  "./mo-hotel/mo-hotel.html", "./mo-icecream/mo-icecream.html", "./mo-icecreamshop/mo-icecreamshop.html", "./mo-icecreamtruck/mo-icecreamtruck.html", 
  "./mo-island/mo-island.html", "./mo-islandhop/mo-islandhop.html", "./mo-jetpack/mo-jetpack.html", "./mo-jetski/mo-jetski.html", "./mo-jetskicontest/mo-jetskicontest.html", "./mo-jetskistop/mo-jetskistop.html",
  "./mo-jigsaw/mo-jigsaw.html", "./mo-jungle/mo-jungle.html", "./mo-kart-3d/mo-kart-3d.html", "./mo-kart/mo-kart.html", "./mo-kittencafe/mo-kittencafe.html", "./mo-kittennursery/mo-kittennursery.html",
  "./mo-knockout/mo-knockout.html", "./mo-laneracer/mo-laneracer.html", "./mo-laundromat/mo-laundromat.html", "./mo-lava/mo-lava.html", "./mo-lavajump/mo-lavajump.html", "./mo-legobuild/mo-legobuild.html",
  "./mo-lemonade/mo-lemonade.html", "./mo-librarywalk/mo-librarywalk.html", "./mo-lighthouse/mo-lighthouse.html", "./mo-litterpatrol/mo-litterpatrol.html", "./mo-lockdown/mo-lockdown.html", "./mo-logcabin/mo-logcabin.html",
  "./mo-mailcarrier/mo-mailcarrier.html", "./mo-matchconnect/mo-matchconnect.html", "./mo-maze/mo-maze.html", "./mo-mazerun/mo-mazerun.html", "./mo-meandmommy-bakery/mo-meandmommy-bakery.html", "./mo-meandmommy-basketball/mo-meandmommy-basketball.html",
  "./mo-meandmommy-beach/mo-meandmommy-beach.html", "./mo-meandmommy-bowling/mo-meandmommy-bowling.html", "./mo-meandmommy-build/mo-meandmommy-build.html", "./mo-meandmommy-camping/mo-meandmommy-camping.html", "./mo-meandmommy-catch/mo-meandmommy-catch.html", "./mo-meandmommy-cooking/mo-meandmommy-cooking.html",
  "./mo-meandmommy-dance/mo-meandmommy-dance.html", "./mo-meandmommy-freezedance/mo-meandmommy-freezedance.html", "./mo-meandmommy-garden/mo-meandmommy-garden.html", "./mo-meandmommy-marble/mo-meandmommy-marble.html", "./mo-meandmommy-memory/mo-meandmommy-memory.html", "./mo-meandmommy-movienight/mo-meandmommy-movienight.html",
  "./mo-meandmommy-music/mo-meandmommy-music.html", "./mo-meandmommy-mystery/mo-meandmommy-mystery.html", "./mo-meandmommy-photo/mo-meandmommy-photo.html", "./mo-meandmommy-picnic/mo-meandmommy-picnic.html", "./mo-meandmommy-puzzle/mo-meandmommy-puzzle.html", "./mo-meandmommy-racing/mo-meandmommy-racing.html",
  "./mo-meandmommy-safari/mo-meandmommy-safari.html", "./mo-meandmommy-shopping/mo-meandmommy-shopping.html", "./mo-meandmommy-slingshot/mo-meandmommy-slingshot.html", "./mo-meandmommy-space/mo-meandmommy-space.html", "./mo-meandmommy-superhero/mo-meandmommy-superhero.html", "./mo-meandmommy-themepark/mo-meandmommy-themepark.html",
  "./mo-meandmommy-timetravel/mo-meandmommy-timetravel.html", "./mo-meandmommy-treasure/mo-meandmommy-treasure.html", "./mo-meandmommy-trivia/mo-meandmommy-trivia.html", "./mo-meandmommy-wordbattle/mo-meandmommy-wordbattle.html", "./mo-megabuild/mo-megabuild.html", "./mo-memory/mo-memory.html",
  "./mo-mermaid/mo-mermaid.html", "./mo-messyroom/mo-messyroom.html", "./mo-meteordodge/mo-meteordodge.html", "./mo-miner/mo-miner.html", "./mo-minigolf/mo-minigolf.html", "./mo-minihoop/mo-minihoop.html",
  "./mo-monster/mo-monster.html", "./mo-moon/mo-moon.html", "./mo-movietheater/mo-movietheater.html", "./mo-museum/mo-museum.html", "./mo-music/mo-music.html", "./mo-mvpcareer/mo-mvpcareer.html",
  "./mo-mycareer/mo-mycareer.html", "./mo-myteam/mo-myteam.html", "./mo-nbamvp/mo-nbamvp.html", "./mo-ninja/mo-ninja.html", "./mo-ninjajump/mo-ninjajump.html", "./mo-ninjarun/mo-ninjarun.html",
  "./mo-northamerica/mo-northamerica.html", "./mo-ocean/mo-ocean.html", "./mo-oceanbuild/mo-oceanbuild.html", "./mo-pancake/mo-pancake.html", "./mo-paramedic/mo-paramedic.html", "./mo-park/mo-park.html",
  "./mo-parkbuild/mo-parkbuild.html", "./mo-parking/mo-parking.html", "./mo-parkmanager/mo-parkmanager.html", "./mo-parkour/mo-parkour.html", "./mo-party/mo-party.html", "./mo-pearldive/mo-pearldive.html",
  "./mo-penalty/mo-penalty.html", "./mo-peppa/mo-peppa.html", "./mo-petdragon/mo-petdragon.html", "./mo-petrace/mo-petrace.html", "./mo-petshop/mo-petshop.html",
  "./mo-photohunt/mo-photohunt.html", "./mo-pinball/mo-pinball.html", "./mo-piratecove/mo-piratecove.html", "./mo-pirateship/mo-pirateship.html", "./mo-pixel/mo-pixel.html", "./mo-pixelart/mo-pixelart.html",
  "./mo-pizza/mo-pizza.html", "./mo-pizzabuild/mo-pizzabuild.html", "./mo-pizzacity/mo-pizzacity.html", "./mo-pizzarush/mo-pizzarush.html", "./mo-pizzashop/mo-pizzashop.html", "./mo-plane-3d/mo-plane-3d.html",
  "./mo-platform/mo-platform.html", "./mo-playhousebuild/mo-playhousebuild.html", "./mo-policechase/mo-policechase.html", "./mo-popashot/mo-popashot.html", "./mo-popcorn/mo-popcorn.html", "./mo-postoffice/mo-postoffice.html",
  "./mo-potholecrew/mo-potholecrew.html", "./mo-puppynursery/mo-puppynursery.html", "./mo-qb/mo-qb.html", "./mo-racecar/mo-racecar.html", "./mo-racer/mo-racer.html", "./mo-rainbowroad/mo-rainbowroad.html",
  "./mo-recyclecorner/mo-recyclecorner.html", "./mo-recyclesorter/mo-recyclesorter.html", "./mo-roadtrip/mo-roadtrip.html", "./mo-robotbuild/mo-robotbuild.html", "./mo-robotbuild2/mo-robotbuild2.html", "./mo-rockband/mo-rockband.html",
  "./mo-rocket/mo-rocket.html", "./mo-rocketbuild/mo-rocketbuild.html", "./mo-rocketcontest/mo-rocketcontest.html", "./mo-rocketland/mo-rocketland.html", "./mo-rocketlaunch/mo-rocketlaunch.html", "./mo-rooftopstunts/mo-rooftopstunts.html",
  "./mo-rowboat/mo-rowboat.html", "./mo-rowcontest/mo-rowcontest.html", "./mo-runcontest/mo-runcontest.html", "./mo-runner/mo-runner.html", "./mo-runstop/mo-runstop.html", "./mo-sandcastle/mo-sandcastle.html",
  "./mo-shark/mo-shark.html", "./mo-sightseeing/mo-sightseeing.html", "./mo-skateboard/mo-skateboard.html", "./mo-skatepark/mo-skatepark.html", 
  "./mo-skyscraper/mo-skyscraper.html", "./mo-sling/mo-sling.html",
  "./mo-smoothie/mo-smoothie.html", "./mo-snake/mo-snake.html", 
  "./mo-soccer/mo-soccer.html", "./mo-soccershoot/mo-soccershoot.html", "./mo-soundtrack/mo-soundtrack.html", "./mo-space/mo-space.html", "./mo-spacebuild/mo-spacebuild.html", "./mo-spacemission/mo-spacemission.html",
  "./mo-spacestation/mo-spacestation.html", "./mo-stack/mo-stack.html", "./mo-stadium/mo-stadium.html", "./mo-stadium2/mo-stadium2.html", "./mo-stadiumbuild/mo-stadiumbuild.html", "./mo-stars/mo-stars.html",
  "./mo-streetball/mo-streetball.html", "./mo-streetcleaner/mo-streetcleaner.html", "./mo-streetfair/mo-streetfair.html", "./mo-stunt-3d/mo-stunt-3d.html", "./mo-sub/mo-sub.html", "./mo-subway/mo-subway.html",
  "./mo-subwayconductor/mo-subwayconductor.html", "./mo-subwaymap/mo-subwaymap.html", "./mo-subwayride/mo-subwayride.html", "./mo-superhero/mo-superhero.html", "./mo-superrun/mo-superrun.html", "./mo-surf/mo-surf.html",
  "./mo-surf2/mo-surf2.html", "./mo-sushi/mo-sushi.html", "./mo-swim/mo-swim.html", "./mo-swimrace/mo-swimrace.html", "./mo-swimrace2/mo-swimrace2.html", "./mo-swipeslice/mo-swipeslice.html",
  "./mo-taco/mo-taco.html", "./mo-taxicontest/mo-taxicontest.html", "./mo-taxidriver/mo-taxidriver.html", "./mo-taxistop/mo-taxistop.html", "./mo-tennis/mo-tennis.html", "./mo-themepark/mo-themepark.html",
  "./mo-thepark/mo-thepark.html", "./mo-tiltball/mo-tiltball.html", "./mo-towerdef/mo-towerdef.html", "./mo-towtruck/mo-towtruck.html", "./mo-traceit/mo-traceit.html", "./mo-trafficcontrol/mo-trafficcontrol.html",
  "./mo-trafficlights/mo-trafficlights.html", "./mo-train-city-3d/mo-train-city-3d.html", "./mo-train/mo-train.html", "./mo-trampoline/mo-trampoline.html", "./mo-trampoline2/mo-trampoline2.html", "./mo-trashcollector/mo-trashcollector.html",
  "./mo-treasurehunt/mo-treasurehunt.html", "./mo-treehousefort/mo-treehousefort.html", "./mo-tripmap/mo-tripmap.html", "./mo-truckcontest/mo-truckcontest.html", "./mo-truckstop/mo-truckstop.html", "./mo-tycoon/mo-tycoon.html",
  "./mo-underground/mo-underground.html", "./mo-volcano/mo-volcano.html", "./mo-walkthedog/mo-walkthedog.html", "./mo-waterballoon/mo-waterballoon.html", "./mo-waterpark/mo-waterpark.html", "./mo-waterslide/mo-waterslide.html",
  "./mo-whack/mo-whack.html", "./mo-whackcritter/mo-whackcritter.html", "./mo-wheel/mo-wheel.html", "./mo-wizardlab/mo-wizardlab.html", "./mo-work/mo-work.html",
  "./mo-world/mo-world.html", "./mo-zipline/mo-zipline.html", "./mo-zoobuild/mo-zoobuild.html", "./mo/mo.html", "./mohouse-build/mohouse-build.html"
];

// Install: cache every file. Each file is added on its own so one missing
// file can never break the whole install.
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(FILES.map(function (f) {
        return c.add(f).catch(function () { /* skip files that 404 */ });
      }));
    })
  );
  self.skipWaiting();
});

// Activate: delete old caches from previous versions.
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Network first: always show the newest version when online.
// Falls back to the pre-cached copy when there is no internet, so every game
// still works offline.
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res && res.status === 200 && res.type === "basic") {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (hit) {
        return hit || caches.match("./index.html");
      });
    })
  );
});
