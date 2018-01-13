import { Component, Inject, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { TreeModel , NodeEvent , RenamableNode, Ng2TreeSettings } from 'ng2-tree';
declare const alertify: any;
@Component ({
  selector: 'app-menu-settings' ,
  templateUrl: './menu.settings.component.html' ,
  styleUrls: ['./menu.settings.component.css']
})

export class MenuSettingsComponent {
  public settings: Ng2TreeSettings = {
    rootIsVisible: false
  };
  public pls: TreeModel;

  public ffs: TreeModel = {
    value: '0',
    id: 1,
    settings: {
      cssClasses: {
        expanded: 'fa fa-caret-down',
        collapsed: 'fa fa-caret-right',
        empty: 'fa fa-caret-right disabled',
        leaf: 'fa'
      },
      templates: {
        node: '',
        leaf: ''
      }
    },
    children: [
      {
        value: 'bin',
        id: 2,
        settings: {
          templates: {
            leftMenu: '<md-icon>search</md-icon>'
          }
        }
      },
      {
        value: 'boot',
        id: 13,
        children: [
          {
            value: 'lost+found',
            id: 22,
            children: []
          }
        ]
      },
      {
        value: 'build-no-left-no-right-menus',
        id: 32,
        settings: {
          leftMenu: false,
          rightMenu: false
        },
        children: [
          {
            value: 'php5-left-menu',
            id: 33,
            settings: {
              templates: {
                leftMenu: '<md-icon>search</md-icon>'
              }
            }
          },

        ]
      },
      {
        value: 'home',
        id: 37,
        children: []
      }
    ]
  };
  private lastFFSNodeId = 86;

  @ViewChild('treeFFS') public treeFFS;

  private static logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    // alertify.message(`${message}: ${e.node.value}`);
    alert(`${message}: ${e.node.value}`);
    // alertify.message(`${message}: ${e.node.value}`);
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.pls = {
        value: 'Programming languages by programming paradigm',
        children: [
          {
            value: 'Aspect-oriented programming',
            children: [
              {value: 'AspectJ'},
              {value: 'AspectC++'}
            ]
          },
          {
            value: 'Object-oriented programming',
            children: [
              {
                value: {
                  name: 'Java',
                  setName(name: string): void {
                    this.name = name;
                  },
                  toString(): string {
                    return this.name;
                  }
                } as RenamableNode
              },
              {value: 'C++'},
              {value: 'C#'}
            ]
          },
          {
            value: 'Prototype-based programming',
            children: [
              {value: 'JavaScript'},
              {value: 'CoffeeScript'},
              {value: 'TypeScript'}
            ]
          }
        ]
      };
    }, 2000);
  }

  public onNodeRemoved(e: NodeEvent): void {
    MenuSettingsComponent.logEvent(e, 'Removed');
  }

  public onNodeMoved(e: NodeEvent): void {
    MenuSettingsComponent.logEvent(e, 'Moved');
  }

  public onNodeRenamed(e: NodeEvent): void {
    MenuSettingsComponent.logEvent(e, 'Renamed');
  }

  public onNodeCreated(e: NodeEvent): void {
    MenuSettingsComponent.logEvent(e, 'Created');
  }

  public onNodeFFSCreated(e: NodeEvent, controller): void {
    MenuSettingsComponent.logEvent(e, 'Created');
    if (controller) {
      controller.changeNodeId(++this.lastFFSNodeId);
    }
  }

  public onNodeSelected(e: NodeEvent): void {
    MenuSettingsComponent.logEvent(e, 'Selected');
  }

  public onNodeExpanded(e: NodeEvent): void {
    MenuSettingsComponent.logEvent(e, 'Expanded');
  }

  public onNodeCollapsed(e: NodeEvent): void {
    MenuSettingsComponent.logEvent(e, 'Collapsed');
  }
}