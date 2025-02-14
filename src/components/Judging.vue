<template>
    <div class="outer-box">
        <div class="details">
            <span>Author: Steve Rogers</span>
            <span>Book: Steve Rogers</span>
            <span>Page No: Steve Rogers</span>
            <span>Change: Steve Rogers</span>
        </div>

        <div class="pages">
            <div class="original">
                <!-- <img :src=org_page> -->
            </div>
            <div class="check"></div>
        </div>
        <div class="marking">
            <button class="marking-buttons" id="red">
                Demote
            </button>
            <button class="marking-buttons" id="orange">
                Moderate
            </button>
            <button class="marking-buttons" id="green">
                Perfect
            </button>
        </div>
        <div class="nav">
            <button class="material-symbols-outlined">
                chevron_left
            </button>
            <button class="material-symbols-outlined">
                chevron_right
            </button>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.outer-box {
    margin-top: 2rem; 
    display: flex;
    flex-direction: column;
}

.details {
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 10px;
}

.pages {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    padding-top: 20px;
}

.original,
.check {
    width: 25rem;
    height: 30rem;
    border-radius: 10px;
    border: 1px solid black;
}

.marking{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 30px;
    right: 200px;
    padding-top: 1rem;
}

.marking-buttons {
    width: 5rem;
    height: 3rem;
    border-radius: 5px;
    color: white;
}

#red{
    background-color: red;
}

#orange{
    background-color: orange;
}

#green{
    background-color: green;
}

.nav{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 1rem;
}

.material-symbols-outlined{
    color: black;
    font-size: 30px;
    border: 1px solid black;
    border-radius: 10px;
}
</style>
