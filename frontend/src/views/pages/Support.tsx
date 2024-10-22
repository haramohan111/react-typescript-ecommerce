import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IconJournalCheck } from 'bootstrap-icons/icons/journal-check.svg';
import { ReactComponent as IconChatRightText } from 'bootstrap-icons/icons/chat-right-text.svg';
import { ReactComponent as IconNewspaper } from 'bootstrap-icons/icons/newspaper.svg';
import { ReactComponent as IconPersonSquare } from 'bootstrap-icons/icons/person-square.svg';
import { ReactComponent as IconReceiptCutoff } from 'bootstrap-icons/icons/receipt-cutoff.svg';
import { ReactComponent as IconCalculator } from 'bootstrap-icons/icons/calculator.svg';
import { ReactComponent as IconCart3 } from 'bootstrap-icons/icons/cart3.svg';
import { ReactComponent as IconTelephone } from 'bootstrap-icons/icons/telephone.svg';

const Search = lazy(() => import('../../components/Search'));

interface SupportViewProps {}

interface SupportViewState {}

class SupportView extends Component<SupportViewProps, SupportViewState> {
  constructor(props: SupportViewProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container my-3">
        <div className="row g-3">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <IconJournalCheck className="i-va" /> Support
              </div>
              <div className="card-body">
                <Search />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-header">
                <IconPersonSquare className="i-va" /> Contact Us
              </div>
              <div className="card-body">
                <address>
                  <strong>Support Team</strong>
                  <br />
                  1234 Support St, Suite 100
                  <br />
                  Help City, HC 12345
                  <br />
                  <IconTelephone className="i-va" />{' '}
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SupportView;
