// This file is part of InfiniteSky.
// Copyright (c) InfiniteSky Dev Teams - Licensed under GNU GPL
// For more information, see LICENCE in the main folder
vms('QuestInfo', [], function(){
    var questRewardTypeSchema = new mongoose.Schema({
      type: Number,
      value: Number,
    },{ _id : false });

// Type:
// 1 = [Monster] (1) Kill !
// 2 = [Item]
//     [Item]
//     Bring Them!
// 3 = [Item]
//     [Item]
//     [NPC]Deliver them to !
// 4 = [Item]
//     [Item]
// 5 = [Monster] Kill!
// 6 = [Item] <-> [Item]
// 7 = Visit!

	var questSchema = mongoose.Schema({
		id: { type: Number, index: true, unique: true },
        Clan: Number,
        QuestNumber: Number,  // 1 based number of quest for each clan.
        Level: Number,        // Can also be level of monster to drop item.
        Unknown4: Number,
        Type: Number,
        Unknown5: Number,
        InQuestDestPacket1: Number, // This is in the quest destination packet, that client sends to server when it is at the spot a monster should spawn. I have no idea what it is.
        Unknown7: Number,
        Unknown8: Number,
        Name: { type: String, index: true },
        FromNPCID: Number,
        Unknown10: Number,
        Unknown11: Number,
        Unknown12: Number,
        Unknown13: Number,
        Unknown14: Number,
        ToNPCID: Number,
        MonsterID: Number,     // Can also be item that the monster of level will drop.
        Value: Number,         // Used for item oramount to killl depending on quest type.
        Unknown17: Number,
        Unknown18: Number,
        Rewards: [questRewardTypeSchema],
        NextQuest: Number,
        Texts: Array
	});

    questSchema.toString = function(kind) {
		switch (kind) {
			case 'small':
                return this.ID+" - "+this.Name;
            break;
			default:
				return this.ID+" - "+this.Name+' Lv: '+this.Level;
			break;
		}
	}

	//Constructor
	delete mongoose.models['quest'];
	var Quest = db.mongoose.model('quest', questSchema);

	db.Quest = Quest;

	db.Quest.findById = function(id, callback){
		db.Quest.findOne({
			id: id
		}, callback);
	};
});
