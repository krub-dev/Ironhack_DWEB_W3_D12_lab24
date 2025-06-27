// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
	const arrayDirectors = moviesArray.map((elem) => elem.director);
	return arrayDirectors;
}

// Corrección Clase \\

function getAllDirectors(moviesArray) {
	return moviesArray.map((elem) => elem.director);
}

// ------------------------------------------------------------------- \\

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
	let count = 0;

	if (moviesArray.length == 0) {
		return 0;
	}
	moviesArray.filter((elem) => {
		if (
			elem.director == "Steven Spielberg" &&
			elem.genre.includes("Drama")
		) {
			count++;
		}
	});
	if (count == 0) {
		return 0;
	} else if (count == 2) {
		return 2;
	}
	return count;
}

// Corrección Clase \\

// Usando filter() y .length (porque es un array). Se puede hacer con un reduce() también.
function howManyMovies(moviesArray) {
	if (!moviesArray.length) return 0;
	return moviesArray.filter((elem) => {
		return (
			elem.director === "Steven Spielberg" && elem.genre.includes("Drama")
		);
	}).length;
}

// ------------------------------------------------------------------- \\

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
	let arrayLength = moviesArray.length;
	let total = 0;
	let avg = 0;

	if (arrayLength == 0) {
		return 0;
	}
	for (let i = 0; i < arrayLength; i++) {
		if (!moviesArray[i].score) {
			continue;
		}
		total += moviesArray[i].score;
	}
	avg = total / arrayLength;
	return Number(avg.toFixed(2));
}

// Corrección Clase \\

// Usando reduce() para sumar todos los scores y luego dividir por la longitud del array.
function scoresAverage(moviesArray) {
	if (!moviesArray.length) return 0;
	const totalScore = moviesArray.reduce((total, movie) => {
		return total + (movie.score || 0); // Si no hay score, sumamos 0. Interesante. Condición de seguridad.
	}, 0);
	return parseFloat((totalScore / moviesArray.length).toFixed(2));
}

// ------------------------------------------------------------------- \\

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
	let arrayLength = moviesArray.length;
	let totalScoreDrama = 0;
	let countDrama = 0;
	let avg = 0;

	if (arrayLength == 1) {
		return moviesArray[0].score;
	}
	for (let i = 0; i < arrayLength; i++) {
		if (!moviesArray[i].score) {
			continue;
		}
		if (moviesArray[i].genre.includes("Drama")) {
			countDrama++;
			if (moviesArray[i].score) {
				totalScoreDrama += moviesArray[i].score;
			}
		}
	}
	if (countDrama === 0) {
		return 0;
	}
	avg = totalScoreDrama / countDrama;
	return Number(avg.toFixed(2));
}

// Corrección Clase \\

// Usando filter(), includes() y reutilizando scoresAverage() para avg
function dramaMoviesScore(moviesArray) {
	const dramaMovies = moviesArray.filter((elem) =>
		elem.genre.includes("Drama")
	);
	if (!dramaMovies.length) return 0;
	return scoresAverage(dramaMovies);
}

// ------------------------------------------------------------------- \\

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
	let newMoviesArray = moviesArray.slice();
	// Podría usar también Spread Operator -> [...moviesArray] - Investigado.

	newMoviesArray.sort((elem1, elem2) => {
		if (elem1.year == elem2.year) {
			return elem1.title.localeCompare(elem2.title);
			// Si el año es el mismo, ordeno por título (alfabéticamente)
		} else {
			return elem1.year - elem2.year;
			// Si da positivo, elem1 (Año1) es MAYOR que elem2 (Año2)
			// Si da negativo, elem1 (Año1) es MENOR que elem2 (Año2)
			// Si da 0, son IGUALES
		}
	});
	return newMoviesArray;
}

// Corrección Clase \\

// Con Spread Operator y sort(). Usado también localeCompare() para comparar alfabéticamente.
function orderByYear(moviesArray) {
	return [...moviesArray].sort((a, b) => {
		if (a.year === b.year) return a.title.localeCompare(b.title); // Si son del mismo año
		return a.year - b.year; // Si no son del mismo año. Ascendente.
	});
}

// ------------------------------------------------------------------- \\

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
	let newMoviesArray = [...moviesArray]; // Uso Spread Operator en este caso para hacer la copia
	let titlesArray = [];

	newMoviesArray.sort((elem1, elem2) => {
		// Ordeno alfabéticamente por título
		return elem1.title.localeCompare(elem2.title);
	});

	// Uso el método map para crear un nuevo array con los títulos de las películas
	titlesArray = newMoviesArray.map((elem) => elem.title);
	// Uso el método slice para quedarme solo con los primeros 20 títulos (o menos). No confundir con splice!
	return titlesArray.slice(0, 20);
}

// Corrección Clase \\

// Con Spread Operator y sort(). Usado también localeCompare() para comparar alfabéticamente. Y slice() para limitar a 20 títulos.
function orderAlphabetically(moviesArray) {
	return [...moviesArray]
		.sort((a, b) => a.title.localeCompare(b.title))
		.slice(0, 20);
}

// Con map() para obtener los títulos y slice() para limitar a 20 títulos.
function orderAlphabetically(moviesArray) {
	return moviesArray
		.map((movie) => movie.title)
		.sort((a, b) => a.localeCompare(b))
		.slice(0, 20);
}

// ------------------------------------------------------------------- \\

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
	let durationProxy = 0;
	let newMoviesArray = moviesArray.slice(); // Hago una copia del array original para no modificarlo

	return newMoviesArray.map((elem) => {
		// Hago una copia del array original para no modificarlo
		durationProxy = 0; // Reset
		if (typeof elem.duration === "string" && elem.duration.includes("h")) {
			durationProxy = parseInt(elem.duration) * 60; // Horas a minutos

			if (elem.duration.includes("min")) {
				if (elem.duration.includes("h")) {
					durationProxy += parseInt(elem.duration.split("h")[1]); // Acumulo los minutos
				} else {
					durationProxy += parseInt(elem.duration[0]); // Acumulo los minutos
				}
			}
		}
		return { ...elem, duration: durationProxy }; // Actualizo la duración en minutos en cada elemento del array
	});
}

// Corrección Clase \\

// Con map() para transformar el array y parseInt() para convertir las horas a minutos.
// Usamos también includes() para comprobar si hay horas y minutos.
// En los minutos, cogemos donde pone min (array[1]) y lo convertimos a número.
function turnHoursToMinutes(moviesArray) {
	return moviesArray.map((moviesArray) => {
		const duration = moviesArray.duration;
		let minutes = 0;
		if (duration.includes("h"))
			minutes += parseInt(duration.split("h")[0] * 60);
		if (duration.includes("min"))
			minutes += parseInt(duration.split(" ")[1].replace("min", ""));
		return { ...moviesArray, duration: minutes };
	});
}

// ------------------------------------------------------------------- \\

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
	let newMoviesArray = moviesArray.slice();

	if (newMoviesArray.length === 0) {
		return null;
	}
	if (newMoviesArray.length === 1) {
		return (
			"BEST Year: " +
			newMoviesArray[0].year +
			"/ AVG Score: " +
			newMoviesArray[0].score +
			"."
		);
	}
	// WIP
}

// Corrección Clase \\

// Bastante más compleja que todo lo demás. Ojo!
// Hemos usado forEach() para recorrer el array de películas 
// y crear un objeto con los años y sus puntuaciones.
// Lo recorremos con un for...in (nuevo) para calcular la puntuación media de cada año con scoresAverage().
// Creamos variables para almacenar el mejor año y la mejor puntuación media. 
// Devolvemos el año y la media. Si hay empate, nos quedamos con el más antiguo. Null si no hay películas.
function bestYearAvg(moviesArray) {
	if (!moviesArray.length) return null;
	const yearScores = {};
	moviesArray.forEach((movie) => {
		if (!yearScores[movie.year]) yearScores[movie.year] = [];
		yearScores[movie.year].push(movie.score || 0);
	});
	let bestYear = null;
	let bestAvg = 0;
	for (const year in yearScores) {
		const avg = scoresAverage(yearScores[year]); // Este tipo de for recorre todos los atributos de un objeto
		if (avg > bestAvg) {
			bestAvg = avg;
			bestYear = year;
		} else if (avg === bestAvg) {
			bestYear = Math.min(bestYear, year); // Si hay empate, elige el año más antiguo
		}
	}
    return `BEST Year: ${bestYear} / AVG Score: ${bestAvg}.`; // Devuelve el año y la media
}

// ------------------------------------------------------------------- \\
