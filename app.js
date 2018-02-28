(function() {
  var Player = function(name, className) {
    this.name = name;
    this.className = className;
  };
  function getResult(cell) {
    return cell.children.length ===0 ? -1 : ($(cell).find('div').hasClass(morpion.players[0].className) ? 0 : 1);
  };
  var play = (event) => {
    var element = event.target || event.currentTarget;
    console.info('click sur ', element);
    var className = morpion.players[morpion.currentPlayer].className;
    var symbol = $('<div class="' + className + '"></div>');
    jElement = $(element);
    jElement.append(symbol);
    jElement.unbind('click');
    if (!morpion.gameOver()) {
      //Joueur suivant
      morpion.next();
      morpion.displayCurrentPlayer();
    }else {
      var winner = morpion.players[morpion.currentPlayer].name;
      console.log('Victoire de %s !', winner);
      $('td').unbind();
      var results = $('#result');
      results.append('<h1>Victoire du ' + winner + '</h1>');
      results.show();
      results.animate({fontSize: '1.5em'}, "slow");
      results.animate({fontSize: '1em'}, "slow");
    }

  };
  var displayCurrentPlayerFn = () => {
    //for (var property in morpion) {
    //  var value = morpion[property];
    //};---->
    morpion.players.forEach((player, index) => {
      var span = $('header span.player' + index);
      span.removeClass(player.className);
    });
    var currentPlayer = morpion.players[morpion.currentPlayer];
    $('header span.player' + morpion.currentPlayer).addClass(currentPlayer.className);
  };
  var initFn = function() {
    console.info('initialisation du morpion');
    $('td').click(play);
    morpion.displayCurrentPlayer()
  };
  var gameOverFn = () => {
    var data = [
      [],[],[]
    ];
    $('table tr').each((i, line) => {
      $(line).find('td').each((j, cell) => {
        data[i][j] = getResult(cell);
      });
    });
    var won = false;
    //lignes
    won = won || data[0][0] > -1 && data[0][0] === data[0][1] && data[0][0] === data[0][2];
    won = won || data[1][0] > -1 && data[1][0] === data[1][1] && data[1][0] === data[1][2];
    won = won || data[2][0] > -1 && data[2][0] === data[2][1] && data[2][0] === data[2][2];
    //colones
    won = won || data[0][0] > -1 && data[0][0] === data[1][0] && data[0][0] === data[2][0];
    won = won || data[0][1] > -1 && data[0][1] === data[1][1] && data[0][1] === data[2][1];
    won = won || data[0][2] > -1 && data[0][2] === data[1][2] && data[0][2] === data[2][2];
    //diagonals
    won = won || data[0][0] > -1 && data[0][0] === data[1][1] && data[0][0] === data[2][2];
    won = won || data[0][2] > -1 && data[0][2] === data[1][1] && data[0][2] === data[2][0];

    return won;
  };
  var resetFn = function() {
    morpion.next();
    morpion.init();
    $('td').empty();
    $('table').show();
    $('#result').empty().hide();
  };
  var morpion = {
    players: [
      new Player('Joueur 1', 'red'),
      new Player('Joueur 2', 'blue')
    ],
    currentPlayer: 0,
    displayCurrentPlayer: displayCurrentPlayerFn,
    init: initFn,
    reset : resetFn,
    gameOver: gameOverFn,
    next: function() {
      morpion.currentPlayer = ++morpion.currentPlayer % morpion.players.length;
    }
  };
  window.morpion = morpion;
  $(document).ready(()=>{
    window.morpion.init();
  });
})();
