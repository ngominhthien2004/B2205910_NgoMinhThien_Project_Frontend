<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">
            <i class="fa fa-book-open mr-2"></i>
            Library Management
        </a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'book' }" class="nav-link">
                    Books
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'requests' }" class="nav-link">
                    My Requests
                </router-link>
            </li>
        </div>
        <div class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown">
                    Ngô Minh Thiện
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="#">Profile</a>
                    <a class="dropdown-item" href="#">Logout</a>
                </div>
            </li>
        </div>
    </nav>
</template>