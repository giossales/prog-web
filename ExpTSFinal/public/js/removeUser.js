document.addEventListener('DOMContentLoaded', () => {
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    let userIdToDelete = null;

    if (confirmDeleteModal) {
        confirmDeleteModal.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;

            const userName = button.getAttribute('data-name');
            userIdToDelete = button.getAttribute('data-id');

            const modalBody = confirmDeleteModal.querySelector('.modal-body');
            modalBody.textContent = `Tem certeza que você quer deletar o usuário "${userName}"?`;
        });

        // adicionando listener ao botão do modal
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        confirmDeleteBtn.addEventListener('click', () => {
            if (userIdToDelete) {
                // requisição ajax
                fetch(`/users/remove/${userIdToDelete}`, {
                    method: 'POST', // 
                })
                    .then(response => {
                        if (response.ok) {
                            window.location.reload();
                        } else {
                            alert('Falha ao deletar o usuário.');
                        }
                    })
                    .catch(error => {
                        console.error('Erro na requisição:', error);
                        alert('Ocorreu um erro de rede.');
                    });
            }
        });
    }
});