

const todoList = document.getElementById("todolist")

function leggTilOppgave() {
    console.log("Legg Til Ny Oppgave")

    const nyOppgaveArticle = document.createElement("article")

    nyOppgaveArticle.innerHTML = ' \
                <input type="checkbox"> \
                <p>TODO: Oppgave-teksten her! </p>  \
                <i class="fa-solid fa-trash"></i>  \
    '
    todoList.appendChild(nyOppgaveArticle)
}

