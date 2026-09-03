<?php

namespace App\Enums;

enum LevelBahaya: string
{
    case Waspada = 'waspada';
    case Siaga = 'siaga';
    case Awas = 'awas';
}
