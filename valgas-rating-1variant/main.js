$(document).ready(function() {
    // При загрузке страницы получаем список парковок с сервера
    $.ajax({
      type: 'GET',
      url: '/parking',
      success: function(parkings) {
        // Отображаем полученный список парковок на странице
        $.each(parkings, function(i, parking) {
          addParkingToList(parking);
        });
      }
    });
  
    // Обрабатываем нажатие на кнопку "Добавить парковку"
    $('#add-button').click(function() {
      var make = $('#make').val();
      var model = $('#model').val();
      var color = $('#color').val();
      var number = $('#number').val();
  
      // Отправляем запрос на сервер для добавления новой парковки
      $.ajax({
        type: 'POST',
        url: '/parking',
        data: {
          make: make,
          model: model,
          color: color,
          number: number
        },
        success: function(parking) {
          // Добавляем новую парковку в список на странице
          addParkingToList(parking);
          // Очищаем поля ввода
          $('#make').val('');
          $('#model').val('');
          $('#color').val('');
          $('#number').val('');
        }
      });
    });
  
    // Обрабатываем нажатие на кнопку "Удалить"
    $('#parking-list').on('click', '.delete-button', function() {
      var id = $(this).data('id');
      // Отправляем запрос на сервер для удаления парковки
      $.ajax({
        type: 'DELETE',
        url: '/parking/' + id,
        success: function() {
          // Удаляем соответствующую строку из таблицы на странице
          $(this).closest('tr').remove();
        }.bind(this)
      });
    });
  
    // Обрабатываем нажатие на кнопку "Редактировать"
    $('#parking-list').on('click', '.edit-button', function() {
      var id = $(this).data('id');
      var make = $(this).closest('tr').find('.make').text();
      var model = $(this).closest('tr').find('.model').text();
      var color = $(this).closest('tr').find('.color').text();
      var number = $(this).closest('tr').find('.number').text();
  
      // Заполняем форму редактирования данными текущей парковки
      $('#edit-make').val(make);
      $('#edit-model').val(model);
      $('#edit-color').val(color);
      $('#edit-number').val(number);
  
      // Обрабатываем нажатие на кнопку "Сохранить"
      $('#edit-button').click(function() {
        var editedMake = $('#edit-make').val();
        var editedModel = $('#edit-model').val();
        var editedColor = $('#edit-color').val();
        var editedNumber = $('#edit-number').val();
  
        // Отправляем запрос на сервер для редактирования текущей парковки
        $.ajax({
          type: 'PUT',
          url: '/parking/' + id,
          data  : {
            make: editedMake,
            model: editedModel,
            color: editedColor,
            number: editedNumber
          },
          success: function(parking) {
            // Обновляем соответствующую строку в таблице на странице
            var row = $('#parking-list').find('[data-id="' + parking.id + '"]');
            row.find('.make').text(parking.make);
            row.find('.model').text(parking.model);
            row.find('.color').text(parking.color);
            row.find('.number').text(parking.number);
            // Очищаем поля ввода формы редактирования
            $('#edit-make').val('');
            $('#edit-model').val('');
            $('#edit-color').val('');
            $('#edit-number').val('');
            // Скрываем форму редактирования
            $('#edit-modal').modal('hide');
          }
        });
      });});

      // Функция добавления парковки в список на странице
      function addParkingToList(parking) {
      var row = '<tr data-id="' + parking.id + '">' +
      '<td class="make">' + parking.make + '</td>' +
      '<td class="model">' + parking.model + '</td>' +
      '<td class="color">' + parking.color + '</td>' +
      '<td class="number">' + parking.number + '</td>' +
      '<td>' +
      '<button class="btn btn-sm btn-primary edit-button" data-id="' + parking.id + '">Редактировать</button> ' +
      '<button class="btn btn-sm btn-danger delete-button" data-id="' + parking.id + '">Удалить</button>' +
      '</td>' +
      '</tr>';
      $('#parking-list').append(row);
      }
      });