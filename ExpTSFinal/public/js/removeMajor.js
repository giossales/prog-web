document.addEventListener('DOMContentLoaded', () => {
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    let majorIdToDelete = null;

    if (confirmDeleteModal) {
        confirmDeleteModal.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;
            const majorName = button.getAttribute('data-name');
            majorIdToDelete = button.getAttribute('data-id');

            const modalBody = confirmDeleteModal.querySelector('.modal-body');
            modalBody.textContent = `Tem certeza que você quer deletar o curso "${majorName}"?`;
        });

        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        confirmDeleteBtn.addEventListener('click', () => {
            if (majorIdToDelete) {
                fetch(`/majors/remove/${majorIdToDelete}`, {
                    method: 'POST',
                })
                    .then(response => {
                        if (response.ok) {
                            window.location.reload();
                        } else {
                            alert('Falha ao deletar o curso.');
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