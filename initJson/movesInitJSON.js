const MoveInit={
    "accuracy": 100,
    "contest_combos": {
        "normal": {
            "use_after": null,
            "use_before": [
                {
                    "name": "double-slap",
                    "url": "https://pokeapi.co/api/v2/move/3/"
                },
            ]
        },
        "super": {
            "use_after": null,
            "use_before": null
        }
    },
    "contest_effect": {
        "url": "https://pokeapi.co/api/v2/contest-effect/1/"
    },
    "contest_type": {
        "name": "tough",
        "url": "https://pokeapi.co/api/v2/contest-type/5/"
    },
    "damage_class": {
        "name": "physical",
        "url": "https://pokeapi.co/api/v2/move-damage-class/2/"
    },
    "effect_chance": null,
    "effect_changes": [],
    "effect_entries": [
        {
            "effect": "Inflicts regular damage.",
            "language": {
                "name": "en",
                "url": "https://pokeapi.co/api/v2/language/9/"
            },
            "short_effect": "Inflicts regular damage with no additional effect."
        }
    ],
    "flavor_text_entries": [
        {
            "language": {
                "name": "zh-Hans",
                "url": "https://pokeapi.co/api/v2/language/12/"
            },
            "name": "拍击"
        }
    ],
    "past_values": [],
    "power": 40,
    "pp": 35,
    "priority": 0,
    "stat_changes": [],
    "super_contest_effect": {
        "url": "https://pokeapi.co/api/v2/super-contest-effect/5/"
    },
    "target": {
        "name": "selected-pokemon",
        "url": "https://pokeapi.co/api/v2/move-target/10/"
    },
    "type": {
        "name": "",
        "url": "https://pokeapi.co/api/v2/type/1/"
    }
}


module.exports= {
    MoveInit
}