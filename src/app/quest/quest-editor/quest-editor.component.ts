import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import gql from 'graphql-tag';
import {Subscription} from 'rxjs/Subscription';
import {CreateQuestResponse, DeleteQuestResponse, EditQuestResponse, GetCampaignResponse, Quest} from '../../types';
import {CampaignService} from '../../services/campaign.service';
import {QuestsService} from '../../services/quests.service';

@Component({
  selector: 'app-quest-editor',
  templateUrl: './quest-editor.component.html',
  styleUrls: ['./quest-editor.component.css']
})
export class QuestEditorComponent implements OnInit, OnDestroy {

  @Input()
  campaignId: string;

  quests: Array<Quest>;

  loading = false;

  editorLoading = false;

  editingQuest: Quest = null;

  questSub: Subscription;

  constructor(private campService: CampaignService, private questService: QuestsService) {
  }

  ngOnInit() {
    this.getQuests();
  }

  ngOnDestroy(): void {
    if (this.questSub) {
      this.questSub.unsubscribe();
    }
  }

  getQuests() {
    this.loading = true;

    this.questSub = this.campService.get(this.campaignId, {quests: true})
      .subscribe(campaign => {
        this.quests = campaign.quests;
        this.loading = false;
      });
  }

  newQuest() {
    this.editingQuest = new Quest();
  }

  selectQuest(quest) {
    this.editingQuest = Object.assign(new Quest(), quest);
  }

  save() {
    this.editorLoading = true;

    if (this.editingQuest.id !== undefined) {
      this.questService.edit(this.editingQuest)
        .then(() => {
          this.editingQuest = null;
          this.editorLoading = false;
        });
    } else {
      this.questService.create(this.editingQuest, this.campaignId)
        .then(() => {
          this.editingQuest = null;
          this.editorLoading = false;
        });
    }
  }

  delete() {
    this.editorLoading = true;

    this.questService.delete(this.editingQuest.id, this.campaignId)
      .then(() => {
        this.editingQuest = null;
        this.editorLoading = false;
      });
  }
}
