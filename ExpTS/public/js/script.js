function removeMajor(id) {
    fetch(`/majors/remove/${id}`, { method: 'POST' }).then(response => {
        if (response.ok){
            console.log('curso removido com sucesso')
            window.location.href = '/majors'
        } else{
            console.log('erro ao remover curso')
            console.log(response.status)
        }
    })
}