$('.search-btn').on('click', function(){
	$.ajax({
		url: 'http://www.omdbapi.com/?apikey=f88d02ee&s=' + $('.input-keyword').val(),
		success: results => {
			const movies = results.Search
			let cards = ''
			movies.forEach(movie => {
				cards += `<div class="col-md-3 my-3">
										<img src="${movie.Poster}" class="card-img-top">
										<div class="card-body">
											<h5 class="card-title">${movie.Title}</h5>
											<h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
											<button type="button" class="btn btn-primary detail-btn" data-toggle="modal" data-target="#detailModal" data-imdbid="${movie.imdbID}">
												Details
											</button>
										</div>
									</div>`
			})
			$('.movie-container').html(cards)
			$('.detail-btn').on('click', function(){
				$.ajax({
					url: 'http://www.omdbapi.com/?apikey=f88d02ee&i=' + $(this).data('imdbid'),
					success: results => {
						const details = `<div class="container-fluid">
																<div class="row">
																	<div class="col-md-3">
																		<img src="${results.Poster}" class="img-fluid">
																	</div>
																	<div class="col-md">
																		<ul class="list-group">
																			<li class="list-group-item"><h4>${results.Title}</h4></li>
																			<li class="list-group-item"><strong>Genre: </strong>${results.Genre}</li>
																			<li class="list-group-item"><strong>Director: </strong>${results.Director}</li>
																			<li class="list-group-item"><strong>Writer: </strong>${results.Writer}</li>
																			<li class="list-group-item"><strong>Actors: </strong>${results.Actors}</li>
																			<li class="list-group-item"><strong>Plot: </strong>${results.Plot}</li>
																		</ul>
																	</div>
																</div>
															</div>`
						$('.modal-body').html(details)
					},
					error: e => {
						console.log(e.responsText)
					}
				})
			})
		},
		error: e => {
			console.log(e.responsText)
		}
	})
})
