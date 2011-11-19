window.timeline = function() {
		
	var dragSrcEl = null;
			
	//started to drag
	function handleDragStart(e) { 
		$(this).css('opacity', '0.4');
		
		dragSrcEl = this;
		e.dataTransfer.effectAllowed = 'move';
		var content = this.innerHTML;
//		e.dataTransfer.setData('text/html', '<div id="draggable" class="ui-widget-content ui-draggable droppedItem">' + content + '</div>');
		e.dataTransfer.setData('text/html', '<div id="draggable" class="ui-widget-content ui-draggable droppedItem">' + content + '<div class="close">x</div></div>');
	}

	//enter a area
	function handleDragOver(e) {
	if (e.preventDefault) e.preventDefault(); // allows us to drop
		$(this).addClass('over');
	}

	//leave a area
	function handleDragLeave(e) {
		$(this).removeClass('over');
	}

	//the dragging is over now
	function handleDragEnd(e) {
		$(this).css('opacity', '1');
		$('.droparea').removeClass('over');
	}

	var update = function(el) {
		$(el).children().draggable({ axis: 'x', containment: 'parent', revert: 'invalid', 
			stop: function(){ $(this).draggable('option','revert','invalid');} 
		});
		$(el).children().droppable({ greedy: true, tolerance: 'touch',
			drop: function(event,ui){ ui.draggable.draggable('option','revert',true);}
		});
		$(el).children().resizable({
			handles: 'e, w',
			containment: 'parent'
		});

		$('.close').click(function() {$(this).parent().hide();});
	};

	function handleDrop(e) {
		if (e.stopPropagation) {
			e.stopPropagation(); // Stops some browsers from redirecting.
		}
		// Set the source column's HTML to the HTML of the columnwe dropped on.
		$(this).append(e.dataTransfer.getData('text/html'));
		$(this).children().draggable({ axis: 'x', containment: 'parent', revert: 'invalid', 
			stop: function(){ $(this).draggable('option','revert','invalid');} 
		});
		$(this).children().droppable({ greedy: true, tolerance: 'touch',
			drop: function(event,ui){ ui.draggable.draggable('option','revert',true);}
		});

		$('.close').click(function() {
			$(this).parent().hide();
 		});
	  
		$(this).children().resizable({
			handles: 'e, w',
			containment: 'parent'
		});
		return false;
	}


	return {
		init: function() {
			$('.droparea').droppable({
				tolerance: 'touch'
			});
			
			//Getting all drop and setting listeners
			var dropareas = document.querySelectorAll('.droparea');

			[].forEach.call(dropareas, function(drop) {
				update(drop);
				drop.addEventListener('dragover', handleDragOver, false);
				drop.addEventListener('dragleave', handleDragLeave, false);
				drop.addEventListener('drop', handleDrop, false);
			});
			
		},
		update: function() {
			//Getting all dndables and setting listeners
			var dndable = document.querySelectorAll('.dndable');
			[].forEach.call(dndable, function(dnd) {
				dnd.addEventListener('dragstart', handleDragStart, false);
				dnd.addEventListener('dragend', handleDragEnd, false);
			});			
		}
	};
}()
